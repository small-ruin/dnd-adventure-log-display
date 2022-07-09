import { Controller, Get, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { LogService } from 'src/log/log.service';
import { MemberService } from 'src/member/member.service';
import { AdventureService } from './adventure.service';

@Controller('hbs/adventure')
export class AdventureViewController {
  constructor(
    private readonly adventureService: AdventureService,
    private readonly logService: LogService,
    private readonly memberService: MemberService,
  ) {}

  @Get()
  @Render('adventureList')
  async getAll() {
    return {
      adventure: await this.adventureService.findAll(),
    };
  }

  @Get('manage')
  @Render('adventureListManage')
  async manageGetAll() {
    return {
      adventure: await this.adventureService.findAll(),
      pcs: await this.memberService.findAll()
    };
  }

  @Get(':id/manage')
  @Render('adventureManage')
  async getLogManage(@Param('id') id: number) {
    const logs = await this.logService.findListByAdventureId(id);
    const adventure = await this.adventureService.find(id);
    return {
      logs,
      adventure,
    };
  }

  @Get(':id')
  async get(@Param('id') id: number, @Res() res: Response) {
    const adventure = await this.adventureService.find(id);
    const logs = await this.logService.findListByAdventureId(id);
    if (!adventure) return res.render('error');
    return res.render('adventure', { adventure, logs });
  }
}
