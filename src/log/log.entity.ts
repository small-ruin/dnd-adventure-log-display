import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Adventure } from '../adventure/adventure.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 40 })
  name: string;

  @Column('blob')
  content: string;

  // 1-docx, 2-txt
  @Column('int', { default: 1 })
  type: number;

  @ManyToOne(() => Adventure, (adventure) => adventure.logs, {
    eager: true,
    onDelete: 'CASCADE',
  })
  adventure: Adventure;

  @CreateDateColumn()
  createdAt: string;
}
