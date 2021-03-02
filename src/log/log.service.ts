import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private repo: Repository<Log>
    ) {}

    create(log): Promise<Log[]> {
        return this.repo.save(log);
    }

    findAll(): Promise<Log[]> {
        return this.repo.find();
    }

    async remove(id: string): Promise<Log> {
        return this.repo.remove(await this.repo.findOne(id));
    }
}
