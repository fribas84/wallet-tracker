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

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  private tempPassword: string;

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
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async checkForPasswordChange() {
    if (this.tempPassword !== this.password) {
      await this.hashPassword();
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
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