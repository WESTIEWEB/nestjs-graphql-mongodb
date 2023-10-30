import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Book')
export class BookT {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  description: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
