import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common';
import { User } from 'src/user/entities';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@ObjectType('Book')
@Unique(['title'])
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
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  userId: string;
}
