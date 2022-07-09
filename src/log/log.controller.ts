import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Body,
} from '@nestjs/common';
import { LogService } from './log.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Log } from './log.entity';

@Controller('api/log')
export class LogController {
  constructor(private service: LogService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.service.find(id);
  }

  @Post(':id')
  @UseInterceptors(FilesInterceptor('logs'))
  async create(@UploadedFiles() logs, @Param('id') id) {
    return await this.service.create(id, logs);
  }

  @Patch(':id')
  async updateName(@Param('id') id: number, @Body() data: Log) {
    return this.service.updateName(id, data.name)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
