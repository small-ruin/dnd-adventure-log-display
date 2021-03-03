import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { LogService } from './log.service';
import Log from '../interface/Log';

@Controller('api/log')
export class LogController {
    constructor(private service: LogService) {}
    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    create(@Body() data: Log) {
        return this.service.create(data);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
