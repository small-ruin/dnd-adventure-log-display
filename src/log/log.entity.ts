import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Adventure } from '../adventure/adventure.entity';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 40 })
    name: string;

    @Column("blob")
    content: string;

    @ManyToOne(() => Adventure, adventure => adventure.logs, { eager: true })
    adventure: Adventure;

    @CreateDateColumn()
    createdAt: string;
}