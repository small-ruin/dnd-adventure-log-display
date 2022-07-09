import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm'


@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private repo: Repository<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return this.repo.save(createMemberDto)    
  }

  findAll() {
    return this.repo.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.repo.update(id, updateMemberDto)
  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
