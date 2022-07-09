import { Column, Entity, PrimaryGeneratedColumn,
    CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('varchar', { length: 30 })
    name: string;

    @CreateDateColumn()
      createAt: string;
    
    @UpdateDateColumn()
      updateAt: string;
}