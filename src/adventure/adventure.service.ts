import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adventure } from './adventure.entity';
import { Log } from '../log/log.entity';
import { ChangeOrderDTO } from 'src/interface';

@Injectable()
export class AdventureService {
    constructor(
        @InjectRepository(Adventure)
        private readonly repo: Repository<Adventure>
    ) {}

    create(adv): Promise<Adventure[]> {
        return this.repo.save<Adventure>(adv);
    }
    
    findAll(): Promise<Adventure[]> {
        return this.repo.find();
    }

    find(id): Promise<Adventure> {
        return this.repo.findOne(id);
    }

    async findLogs(id: string): Promise<Log[]> {
        return (await this.repo.findOne(id)).logs;
    }
    
    async remove(id: string): Promise<Adventure> {
        return this.repo.remove(await this.repo.findOne(id));
    }

    async changeOrder({adventureId, logId, step} : ChangeOrderDTO) {
      const adventure = await this.find(adventureId);
      const orderArr = adventure.order.split(',');
      const logIdIndex = orderArr.findIndex(i => +i === logId);
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
}
