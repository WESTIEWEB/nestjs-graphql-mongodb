import { Query, Resolver } from '@nestjs/graphql';
import { BookT } from '../types';

@Resolver((of) => BookT)
export class BookResolver {
  @Query((returns) => BookT)
  async book() {
    return {
      id: 1,
      title: 'The Hobbit',
    };
  }
}
