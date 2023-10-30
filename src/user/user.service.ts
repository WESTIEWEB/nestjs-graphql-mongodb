import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return [
      {
        id: 1,
        name: 'The Great Gatsby',
      },
      {
        id: 2,
        name: 'Nineteen Eighty-Four',
      },
    ];
  }
}
