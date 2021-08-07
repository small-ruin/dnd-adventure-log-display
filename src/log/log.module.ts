import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { Adventure } from 'src/adventure/adventure.entity';
import { LogViewController } from './log.view.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Log, Adventure])],
  controllers: [LogController, LogViewController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
