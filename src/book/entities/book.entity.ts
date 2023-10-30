import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Book')
export class Book {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  author?: string;

  @Field()
  description?: string;
}
