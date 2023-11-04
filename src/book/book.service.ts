import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities';
import { Repository } from 'typeorm';
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
    return this.bookRepository.save(employee);
  }
}
