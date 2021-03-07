import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { AdventureService } from './adventure.service';
import { Adventure, ChangeOrderDTO, SearchDTO } from 'src/interface';
import { LogService } from 'src/log/log.service';

@Controller('api/adventure')
export class AdventureController {
    constructor(
        private readonly adventureService: AdventureService,
        private readonly logService: LogService
    ) {}

    @Get()
    findAll() {
        return this.adventureService.findAll();
    }

    @Get(':id/logs')
    findLogs(@Param('id') id: string) {
        return this.logService.findListByAdventureId(id);
    }

    @Post()
    create(@Body() data: Adventure) {
        return this.adventureService.create(data);
    }

    @Get('/search')
    search(@Query() query: SearchDTO) {
        return this.adventureService.search(query);
    }

    @Get(':id')
    find(@Param('id') id: string) {
        return this.adventureService.find(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.adventureService.remove(id);
    }

    @Post('/changeOrder')
    changeOrder(@Body() data: ChangeOrderDTO) {
      return this.adventureService.changeOrder(data);
    }
}
