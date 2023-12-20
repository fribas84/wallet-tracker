import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { Logger } from '@nestjs/common';

@Entity()
export class User {
  private readonly logger = new Logger('Entity User');
  private passwordChanged = false;

  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    nullable: false,
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
    this.confirmationToken = await this.createTempToken();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.passwordChanged) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    this.passwordChanged = false;
  }

  async comparePassword(attempt: string): Promise<boolean> {
    this.logger.log(`Comparing password: ${attempt}`);
    return await bcrypt.compare(attempt, this.password);
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
    this.passwordChanged = true;
  }

  async createTempToken() {
    const rnd = (
      len: number,
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    ) =>
      [...Array(len)]
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');
    return rnd(6);
  }
}
