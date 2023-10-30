import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Book')
export class BookT {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  author?: string;

  @Field()
  description?: string;
}
