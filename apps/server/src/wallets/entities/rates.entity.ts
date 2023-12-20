import {
  Entity,
  Column,
  BeforeInsert,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';

@Entity()
export class Rates {
  @ObjectIdColumn()
  id: ObjectId;

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
