import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { Adventure } from '../adventure/adventure.entity';
import { FindManyOptions, getManager, Repository } from 'typeorm';
import { convertToHtml } from 'mammoth';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private repo: Repository<Log>,
    @InjectRepository(Adventure)
    private adventureRepo: Repository<Adventure>,
  ) {}

  async create(id, logs): Promise<Adventure> {
    const adventure = await this.adventureRepo.findOne(id);
    logs = await Promise.all(
      logs.map((log) => {
        return new Promise((resolve, reject) => {
          convertToHtml({ buffer: log.buffer }).then((res) => {
            const name = log.originalname.replace(/.docx|.docc/, '');
            resolve({
              name,
              content: res.value,
              adventure,
            });
          }, reject);
        });
      }),
    );

    logs = await Promise.all(logs.map((log) => this.repo.save(log)));
    const order = logs.map((i) => i.id).join(',');
    if (adventure.order === '') {
      adventure.order = order;
    } else {
      adventure.order += ',' + order;
    }
    return await this.adventureRepo.save(adventure);
  }

  find(id): Promise<Log> {
    return this.repo.findOne(id);
  }

  async findListByAdventureId(adventureId, limit?) {
    const adventure = await this.adventureRepo.findOne(adventureId)

    if (!adventure) {
      return [];
    }

    const orderArr = adventure?.order?.split(',').filter((i) => i);

    const findOption: FindManyOptions<Log> = {
      select: ['id', 'name', 'createdAt'],
      where: { adventure: adventureId },
    }
    if (limit) {
      findOption.skip = 0
      findOption.take = limit
      findOption.order = { 'createdAt': 'DESC' }
    }

    const logs = await this.repo.find(findOption);

    // 有limit的固定取录入最迟的10个
    if (logs && orderArr && !limit) {
      const sorted = [];
      orderArr.forEach((i) => sorted.push(logs.find((log) => log.id === +i)));
      return sorted.filter(i => i);
    }

    return logs;
  }

  async findLatestByAdventureId(adventureId) {
    const query = await getManager()
      .createQueryBuilder()
      .select(['id', 'name'])
      .addSelect('Max("createdAt")', 'createdAt')
      .from(
        (qb) =>
          qb
            .select('*')
            .from(Log, 'log')
            .where('log.adventureId =' + adventureId),
        'log2',
      )
      .getQuery();

    return await getManager().query(query);
  }

  findAll(): Promise<Log[]> {
    return this.repo.find();
  }

  async remove(id: string): Promise<Log> {
    const log = await this.repo.findOne({
      relations: ['adventure'],
      where: { id },
    });
    const adventure = await this.adventureRepo.findOne(log.adventure.id);
    const orderArr = adventure.order.split(',');
    orderArr.splice(
      orderArr.findIndex((i) => +i === log.id),
      1,
    );
    adventure.order = orderArr.join(',');
    await this.adventureRepo.save(adventure);
    return this.repo.remove(await this.repo.findOne(id));
  }
}
