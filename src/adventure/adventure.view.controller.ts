import { Controller, Get, Render } from "@nestjs/common";
import { AdventureService } from './adventure.service';

@Controller('adventure')
export class AdventureViewController {
    constructor(private readonly adventureService: AdventureService) {}

    @Get()
    @Render('adventure')
    async getAll() {
        return {
            adventure: await this.adventureService.findAll()
        }
    }

    @Get('create')
    @Render('adventureManage')
    async create() {
        return {
            adventure: await this.adventureService.findAll()
        }
    }
}