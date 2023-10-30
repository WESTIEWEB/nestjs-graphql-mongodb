import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../entities';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User)
  async user() {
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
    };
  }
}
