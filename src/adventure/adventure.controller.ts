import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AdventureService } from './adventure.service';
import Adventure from 'src/interface/Adventure';

@Controller('adventure')
export class AdventureController {
    constructor(private readonly adventureService: AdventureService) {}

    @Get()
    findAll() {
        return this.adventureService.findAll();
    }

    @Post()
    create(@Body() data: Adventure) {
        return this.adventureService.create(data);
    }

    @Get()
    findLogs(@Param('id') id: string) {
        return this.adventureService.findLogs(id);
    }

    @Delete()
    remove(@Param('id') id: string) {
        return this.adventureService.remove(id);
    }
}
