import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adventure } from './adventure.entity';
import { Log } from '../log/log.entity';

@Injectable()
export class AdventureService {
    constructor(
        @InjectRepository(Adventure)
        private readonly repo: Repository<Adventure>
    ) {}

    create(adv): Adventure[] {
        return this.repo.create(adv);
        
    }
    
    findAll(): Promise<Adventure[]> {
        return this.repo.find();
    }

    async findLogs(id: string): Promise<Log[]> {
        return (await this.repo.findOne(id)).logs;
    }
    
    async remove(id: string): Promise<Adventure> {
        return this.repo.remove(await this.repo.findOne(id));
    }
}
