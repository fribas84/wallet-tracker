import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: number;

  @Column()
  eur: number;

  @Column()
  usd: number;
}
