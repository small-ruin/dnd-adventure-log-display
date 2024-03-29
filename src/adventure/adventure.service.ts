import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindOptionsWhere, UpdateResult } from 'typeorm';
import { Adventure } from './adventure.entity';
import { Log } from '../log/log.entity';
import { ChangeOrderDTO, SearchDTO } from 'src/interface';
import { Member } from 'src/member/entities/member.entity';

@Injectable()
export class AdventureService {
  constructor(
    @InjectRepository(Adventure)
    private readonly repo: Repository<Adventure>,
    @InjectRepository(Log)
    private readonly logRepo: Repository<Log>,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>
  ) {}

  create(adv): Promise<Adventure[]> {
    return this.repo.save<Adventure>(adv);
  }

  update(id, adv): Promise<UpdateResult> {
    return this.repo.update(id, adv)
  }

  findAll(): Promise<Adventure[]> {
    return this.repo.find({ relations: { members: true }});
  }

  find(id): Promise<Adventure> {
    return this.repo.findOne({
      where: {id},
      relations: { members: true }
    });
  }

  async findLogs(id: number): Promise<Log[]> {
    return (await this.repo.findOneBy({id}))?.logs;
  }

  async remove(id: number): Promise<Adventure> {
    return this.repo.remove(await this.repo.findOneBy({id}));
  }

  async changeOrder({ adventureId, logId, step }: ChangeOrderDTO) {
    const adventure = await this.find(adventureId);
    const orderArr = adventure.order.split(',');
    const logIdIndex = orderArr.findIndex((i) => +i === logId);
    const targetIndex = logIdIndex + step;

    if (targetIndex < 0 || targetIndex > orderArr.length - 1) {
      throw new HttpException('step error', HttpStatus.BAD_REQUEST);
    }

    const tem = logId;
    orderArr[logIdIndex] = orderArr[targetIndex];
    orderArr[targetIndex] = tem + '';

    adventure.order = orderArr.join(',');
    return this.repo.save(adventure);
  }

  async getIdByName(name) {
    if (!name) return null;
    return (await this.repo.findOneBy({ name: Like(`%${name}%`) }))?.id;
  }

  async search({ id, key, noContent, log }: SearchDTO) {
    const select: (keyof Log)[] = ['id', 'name', 'createdAt'];
    if (!noContent) {
      select.push('content');
    }

    const where: FindOptionsWhere<Log> = {
      adventure: { id },
      content: Like(`%${key}%`),
    }
    if (log) {
      where.name = Like(`%${log}%`)
    }

    const logs = await this.logRepo.find({
      select,
      where,
    });

    return logs;
  }

  // members
  async addPc(id, pc: number) {
    const adv = await this.find(id)
    const mem = await this.memberRepo.findOneBy({id: pc}); 
    adv.members = [...(adv.members || []), mem]
    return this.repo.save(adv)
  }
  async removePc(id, pc: number) {
    const adv = await this.find(id)
    adv.members = adv.members.filter(m => m.id !== +pc)
    return this.repo.save(adv)
  }
}
