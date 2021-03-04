import { Controller, Get, Param, Render } from "@nestjs/common";
import { LogService } from "./log.service";

@Controller('log')
export class LogViewController {
    constructor(private service: LogService) {}
    
    @Get(':id')
    @Render('log')
    async findById(@Param('id') id) {
        const log = await this.service.find(id);
        return { log };
    }
}