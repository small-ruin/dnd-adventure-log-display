import { Controller, Get, Render, Param, Res } from "@nestjs/common";
import { Response } from 'express';
import { LogService } from "src/log/log.service";
import { AdventureService } from './adventure.service';

@Controller('adventure')
export class AdventureViewController {
    constructor(
        private readonly adventureService: AdventureService,
        private readonly logService: LogService,
    ) {}

    @Get()
    @Render('adventureList')
    async getAll() {
        return {
            adventure: await this.adventureService.findAll()
        }
    }

    @Get('manage')
    @Render('adventureListManage')
    async create() {
        return {
            adventure: await this.adventureService.findAll()
        }
    }

    @Get(':id/manage')
    @Render('adventureManage')
    async getLogManage(@Param() params) {
        return {
            adventure: await this.adventureService.find(params.id)
        }
    }

    @Get(":id")
    async get(@Param("id") id, @Res() res: Response) {
        const adventure = await this.adventureService.find(id);
        const logs = await this.logService.findListByAdventureId(id);
        if (!adventure)
            return res.render('error');
        return res.render('adventure', { adventure, logs });
    }
}