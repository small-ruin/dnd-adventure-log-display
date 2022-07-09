import { Module } from '@nestjs/common';
import { AdventureController } from './adventure.controller';
import { AdventureViewController } from './adventure.view.controller';
import { AdventureService } from './adventure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adventure } from './adventure.entity';
import { Log } from '../log/log.entity';
import { LogService } from 'src/log/log.service';
import { MemberService } from 'src/member/member.service';
import { Member } from 'src/member/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adventure, Log, Member])],
  controllers: [AdventureController, AdventureViewController],
  providers: [AdventureService, LogService, MemberService],
  exports: [AdventureService],
})
export class AdventureModule {}
