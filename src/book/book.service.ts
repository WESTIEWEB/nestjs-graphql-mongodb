import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  findAll() {
    return [
      {
        id: 1,
        title: 'The Great Gatsby',
      },
      {
        id: 2,
        title: 'Nineteen Eighty-Four',
      },
    ];
  }
}
