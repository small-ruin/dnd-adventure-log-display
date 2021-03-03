import { Controller, Get, Render, Param, HttpException, Res } from "@nestjs/common";
import { Response } from 'express';
import { AdventureService } from './adventure.service';
import { Adventure } from "./adventure.entity";

@Controller('adventure')
export class AdventureViewController {
    constructor(private readonly adventureService: AdventureService) {}

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
    async get(@Param() params, @Res() res: Response) {
        const adventure = await this.adventureService.find(params.id);
        if (!adventure)
            return res.render('error');
        return res.render('adventure', { adventure });
    }
}