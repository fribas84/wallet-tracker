import { Entity, Column, ObjectIdColumn, Unique } from 'typeorm';
import { ObjectId } from 'mongodb';

@Unique(['name', 'userId'])
@Unique(['address', 'userId'])
@Entity()
export class Wallet {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  userId: ObjectId;

  @Column()
  preference: number;
}
