import { Module } from '@nestjs/common';
import { AdventureController } from './adventure.controller';
import { AdventureService } from './adventure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adventure } from './adventure.entity';
import { Log } from '../log/log.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Adventure, Log])],
    controllers: [AdventureController],
    providers: [AdventureService],
    // exports: [AdventureService],
})
export class AdventureModule {}
