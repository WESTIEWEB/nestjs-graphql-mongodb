import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['books'],
      select: ['id', 'firstName', 'lastName', 'phone', 'email', 'role'],
    });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['books'],
      select: ['id', 'firstName', 'lastName', 'phone', 'email', 'role'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['books'],
      select: ['id', 'firstName', 'lastName', 'phone', 'email', 'role'],
    });
  }

  async findByEmailOrThrow(email: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({
      email: email,
    });
  }
}
