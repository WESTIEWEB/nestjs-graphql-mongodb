import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '../entities';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('user') user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Query(() => [User], { name: 'AllUsers' })
  async user() {
    const users = await this.userService.findAll();
    return users;
  }
}
