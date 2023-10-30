import { Query, Resolver } from '@nestjs/graphql';
import { Book } from '../entities';

@Resolver((of) => Book)
export class BookResolver {
  @Query((returns) => Book)
  async book() {
    return {
      id: 1,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
    };
  }
}
