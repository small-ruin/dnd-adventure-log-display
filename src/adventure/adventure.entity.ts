import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Log } from '../log/log.entity';

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

  @OneToMany(() => Log, (log) => log.adventure)
  @JoinColumn()
  logs: Log[];

  @CreateDateColumn()
  createAt: string;
}
