import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFiles,
  Redirect,
} from '@nestjs/common';
import { LogService } from './log.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/log')
export class LogController {
  constructor(private service: LogService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  find(@Param() id: string) {
    return this.service.find(id);
  }

  @Post(':id')
  @UseInterceptors(FilesInterceptor('logs'))
  create(@UploadedFiles() logs, @Param('id') id) {
    return this.service.create(id, logs);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
