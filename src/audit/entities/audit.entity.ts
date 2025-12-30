import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Audit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  idUser: number;
  @Column()
  ip: string;
  @Column()
  date: Date;
}
