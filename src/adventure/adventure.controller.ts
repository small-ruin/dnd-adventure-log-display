import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AdventureService } from './adventure.service';
import Adventure from 'src/interface/Adventure';

@Controller('api/adventure')
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

    @Get(':id')
    find(@Param('id') id: string) {
        return this.adventureService.find(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.adventureService.remove(id);
    }
}
