import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdventureModule } from './adventure/adventure.module';
import { LogModule } from './log/log.module';
import { Adventure } from './adventure/adventure.entity';
import { Log } from './log/log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [Adventure, Log],
      database: './db/dnd-adventure-log-display.prod.db',
      synchronize: true,
    }),
    AdventureModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
