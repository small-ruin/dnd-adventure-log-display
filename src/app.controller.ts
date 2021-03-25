import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from "express";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['/', '/adventure', '/log', '/adventure/:id', '/log/:id'])
  get(@Res() res: Response) {
      res.sendFile(join(process.cwd(), 'public/index.html'));
  }
}
