import { Controller, Get, Render } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('hbs/member')
export class MemberViewController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @Render('member')
  async findAll() {
    return { pcs: await this.memberService.findAll() };
  }

  @Get('/manage')
  @Render('memberManage')
  async getManage() {
    return {pcs: await this.memberService.findAll() };
  }
}
