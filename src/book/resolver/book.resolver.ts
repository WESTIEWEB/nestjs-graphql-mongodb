import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from '../entities';
import { BookService } from '../book.service';
import { CreateBookDto } from '../dto/create-book.dto';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}
  @Query((returns) => [Book], { name: 'getAllBooks' })
  async book() {
    const books = await this.bookService.findAll();
    return books;
  }

  @Mutation((returns) => Book, { name: 'createBook' })
  async createBook(@Args('book') book: CreateBookDto) {
    return this.bookService.create(book);
  }
}
