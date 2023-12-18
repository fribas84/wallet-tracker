import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['name', 'userId'])
@Unique(['address', 'userId'])
@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  userId: number;

  @Column()
  preference: number;
}
