import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletId: number;

  @Column()
  balance: string;

  @Column()
  rateUsd: number;

  @Column()
  rateEur: number;

  @Column()
  isOld: boolean;

  @Column()
  timestamp: number;

}
