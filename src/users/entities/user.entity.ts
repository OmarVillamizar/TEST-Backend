import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') //Nombre para la DB Oracle
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    nombre!: string;
  
    @Column({ unique: true, length: 150 })
    email!: string;

    @Column({ length: 60 })
    password!: string;
    
    @Column({ default: true })
    activo!: boolean;
    
    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt!: Date;
}
