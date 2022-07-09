import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AdventureService } from './adventure.service';
import { Adventure, ChangeOrderDTO, SearchDTO } from 'src/interface';
import { LogService } from 'src/log/log.service';

@Controller('api/adventure')
export class AdventureController {
  constructor(
    private readonly adventureService: AdventureService,
    private readonly logService: LogService,
  ) {}

  @Get()
  findAll() {
    return this.adventureService.findAll();
  }

  @Get('/id')
  async getId(@Query() { name }) {
    try {
      const id = await this.adventureService.getIdByName(name)
      if (id) {
        return { id }
      } else {
        return {
          code: 0,
          message: '未找到'
        }
      }
    } catch (e) {
      return {
        code: 0,
        message: e
      }
    }
  }


  @Get(':id/logs')
  findLogs(@Param('id') id: number, @Query() { latest, limit }) {
    if (latest) {
      return this.logService.findLatestByAdventureId(id);
    } else {
      return this.logService.findListByAdventureId(id, limit);
    }
  }

  @Post()
  create(@Body() data: Adventure) {
    return this.adventureService.create(data);
  }

  @Get('/search')
  async search(@Query() { id, name, key, noContent = false, log }: SearchDTO) {
    if (!id && !name) {
      throw new HttpException('搜索功能需要战役信息', HttpStatus.BAD_REQUEST);
    }
    if (!key?.trim()) {
      throw new HttpException('关键词不能为空', HttpStatus.BAD_REQUEST);
    }
    if (!id && name) {
      id = await this.adventureService.getIdByName(name);
    }
    return this.adventureService.search({ id, key, noContent, log });
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.adventureService.find(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adventureService.remove(id);
  }

  @Post('/changeOrder')
  changeOrder(@Body() data: ChangeOrderDTO) {
    return this.adventureService.changeOrder(data);
  }
}
