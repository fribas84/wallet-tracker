import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { before } from 'node:test';

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

  @Column({
    nullable: true,
  })
  confirmationToken: string;

  @BeforeInsert()
  beforeInsertActions() {
    this.isConfirmed = false;
  }

  @BeforeInsert()
  async createConfirmationToken() {
    const rnd = (
      len: number,
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    ) =>
      [...Array(len)]
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');
    this.confirmationToken = rnd(6);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
