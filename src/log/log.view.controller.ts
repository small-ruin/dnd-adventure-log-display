import { Controller, Get, Param, Render, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { LogService  } from "./log.service";
import { join } from 'path';

@Controller('log')
export class LogViewController {
    constructor(private service: LogService) {}
    
    @Get('/')
    get(@Res() res: Response) {
        // change the path to the correct html page path in your project
        res.sendFile(join(process.cwd(), 'public/index.html'));
    }

    @Get(':id')
    @Render('log')
    async findById(@Param('id') id) {
        const log = await this.service.find(id);
        return { log };
    }
}