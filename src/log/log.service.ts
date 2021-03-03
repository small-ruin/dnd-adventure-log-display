import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { Adventure } from '../adventure/adventure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private repo: Repository<Log>,
        @InjectRepository(Adventure)
        private adventureRepo: Repository<Adventure>
    ) {}

    async create(log): Promise<Adventure> {
        const adventure = await this.adventureRepo.findOne(log.adventureId);
        adventure.logs.push(log)
        await this.repo.save(log);
        return await this.adventureRepo.save(adventure);
    }

    findAll(): Promise<Log[]> {
        return this.repo.find();
    }

    async remove(id: string): Promise<Log> {
        return this.repo.remove(await this.repo.findOne(id));
    }
}
