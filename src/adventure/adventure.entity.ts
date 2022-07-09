import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  JoinTable
} from 'typeorm';
import { Log } from '../log/log.entity';
import { Member } from 'src/member/entities/member.entity';

@Entity()
export class Adventure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @Column({
    type: 'text',
    default: '',
  })
  order: string;

  @Column({ type: 'text', default: '' })
  announcement: string

  @OneToMany(() => Log, (log) => log.adventure)
  @JoinColumn()
  logs: Log[];

  @ManyToMany(() => Member, {
    cascade: true,
    onDelete:"CASCADE",
  })
  @JoinTable()
  members: Member[];

  @CreateDateColumn()
  createAt: string;

  @UpdateDateColumn()
  updateAt: string;
}
