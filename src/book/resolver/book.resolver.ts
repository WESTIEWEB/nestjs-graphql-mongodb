import { Query, Resolver } from '@nestjs/graphql';
import { Book } from '../entities';
import { BookService } from '../book.service';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}
  @Query((returns) => [Book], { name: 'getAllBooks' })
  async book() {
    const books = await this.bookService.findAll();
    return books;
  }
}
