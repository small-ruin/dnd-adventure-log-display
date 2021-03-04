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
                    })
                }, reject);
            })
        }));
        logs.forEach(log => {
            adventure.logs.push(log);
        })
        await Promise.all(logs.map(log => this.repo.save(log)));
        return await this.adventureRepo.save(adventure);
    }

    find(id): Promise<Log> {
        return this.repo.findOne(id);
    }

    findAll(): Promise<Log[]> {
        return this.repo.find();
    }

    async remove(id: string): Promise<Log> {
        return this.repo.remove(await this.repo.findOne(id));
    }
}
