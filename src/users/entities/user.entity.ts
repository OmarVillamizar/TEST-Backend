import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users') //Nombre para la DB Oracle
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    nombre!: string;
    
    @Column({ default: true })
    activo!: boolean;
    
    @CreateDateColumn()
    createdAt!: Date;
}
