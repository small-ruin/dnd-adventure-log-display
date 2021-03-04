import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { LogService } from './log.service';
import Log from '../interface/Log';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/log')
export class LogController {
    constructor(private service: LogService) {}
    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post(":id")
    @UseInterceptors(FilesInterceptor('logs'))
    create(@UploadedFiles() logs, @Param('id') id) {
        return this.service.create(id, logs);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
