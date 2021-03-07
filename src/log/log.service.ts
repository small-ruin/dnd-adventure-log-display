import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { Adventure } from '../adventure/adventure.entity';
import { Repository } from 'typeorm';
import { convertToHtml } from 'mammoth';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private repo: Repository<Log>,
        @InjectRepository(Adventure)
        private adventureRepo: Repository<Adventure>
    ) {}

    async create(id, logs): Promise<Adventure> {
        const adventure = await this.adventureRepo.findOne(id);
        logs = await Promise.all(logs.map(log =>{
            return new Promise((resolve, reject) => {
                convertToHtml({ buffer: log.buffer }).then(res => {
                    const name = log.originalname.replace(/.docx|.docc/, '');
                    resolve({
                        name,
                        content: res.value,
                        adventure,
                    })
                }, reject);
            })
        }));

        logs = await Promise.all(logs.map(log => this.repo.save(log)));
        const order = logs.map(i => i.id).join(',');
        adventure.order += order;
        return await this.adventureRepo.save(adventure);
    }

    find(id): Promise<Log> {
        return this.repo.findOne(id);
    }

    async findListByAdventureId(adventureId) {
        const orderArr = (await this.adventureRepo.findOne(adventureId)).order?.split(',').filter(i => i);
        
        const logs = await this.repo.find({ select: ['id', 'name', 'createdAt'], where: { adventure: adventureId } })

        if (logs && orderArr) {
          const sorted = [];
          orderArr.forEach(i => sorted.push(logs.find(log => log.id === +i)));
          return sorted;
        }

        return logs;
    }

    findAll(): Promise<Log[]> {
        return this.repo.find();
    }

    async remove(id: string): Promise<Log> {
        return this.repo.remove(await this.repo.findOne(id));
    }
}
