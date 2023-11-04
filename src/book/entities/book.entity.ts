import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common';
import { User } from 'src/user/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@ObjectType('Book')
@Entity()
export class Book extends CommonEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  author?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.books, { lazy: true })
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;
}
