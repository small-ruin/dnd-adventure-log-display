import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { Log } from '../log/log.entity';

@Entity()
export class Adventure {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 30 })
    name: string;

    @OneToMany(() => Log, log => log.adventure, { eager: true })
    @JoinColumn()
    logs: Log[];

    @CreateDateColumn()
    createAt: string;
    
}