import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Rates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eur: number;

  @Column()
  usd: number;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @BeforeInsert()
  setCreationDate() {
    this.createdAt = Math.floor(Date.now() / 1000);
  }
}
