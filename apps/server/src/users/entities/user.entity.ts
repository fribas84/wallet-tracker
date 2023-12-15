import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    nullable: false,
    select: false,
  })
  isConfirmed: boolean;

  @BeforeInsert()
  beforeInsertActions() {
    this.isConfirmed = false;
  }
}
