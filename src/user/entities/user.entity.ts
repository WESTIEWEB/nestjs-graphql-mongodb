import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/entities';
import { CommonEntity } from 'src/common';
import { USERROLE } from 'src/common/interface';
import { Column, Entity, JoinColumn, OneToMany, Unique } from 'typeorm';

@Entity()
@ObjectType()
@Unique(['email', 'phone'])
export class User extends CommonEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  phone: string;

  @Column()
  @Field()
  password!: string;

  @Column({ default: 'USER', enum: USERROLE })
  @Field({ defaultValue: 'USER' })
  role: USERROLE;

  @OneToMany(() => Book, (book) => book.user)
  @Field(() => [Book])
  books: Book[];
}
