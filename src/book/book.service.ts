import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities';
import { Not, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async create(employee: CreateBookDto): Promise<Book> {
    const book = await this.findByTitle(employee.title);

    if (book) {
      throw new NotFoundException('Book already exists');
    }
    return this.bookRepository.save(employee);
  }

  async findOne(id: string): Promise<Book> {
    const book = this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async findByTitle(title: string): Promise<Book> {
    return this.bookRepository.findOne({
      where: {
        title,
      },
    });
  }
}
