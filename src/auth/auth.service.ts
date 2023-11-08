import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
// import { OAuth } from 'auth0';
import { Profile } from 'passport-auth0';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadI } from './interface';
import { Message } from 'src/common';
import { User } from 'src/user/entities';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}
  //Jwt Service for generating token
  async generateToken(payload: JwtPayloadI) {
    return await this.jwtService.signAsync(payload);
  }

  async register(body: RegisterDto) {
    const existing = await this.userService.findByEmail(body.email);

    if (existing) {
      return Message.alreadyExistt('User');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const data = {
      client_id: process.env.AUTH0_CLIENT_ID,
      email: body.email,
      password: body.password,
      connection: 'Username-Password-Authentication',
    };

    try {
      await queryRunner.startTransaction();
      const response = await axios.post(
        `https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`,
        data,
      );

      const token = await this.generateToken({
        email: response.data.email,
        sub: response.data.user_id,
      } as unknown as JwtPayloadI);

      const createdUser = await this.createUser(body, queryRunner);

      await queryRunner.commitTransaction();

      return {
        message: Message.createdSuccess('User'),
        user: createdUser,
        token,
      };
    } catch (error) {
      // Handle registration error
      await queryRunner.rollbackTransaction();
      console.error('Auth0 registration error:', error);
      throw new Error('User registration failed');
    } finally {
      await queryRunner.release();
    }
  }

  async validateUser(profile: Profile): Promise<any> {
    const user = await this.userService.findByEmail(profile.emails[0].value);

    if (!user) {
      throw new UnauthorizedException('Authentication failed');
    }

    return user;
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    return user;
  }

  async auth0callback(profile: Profile): Promise<any> {
    const user = await this.validateUser(profile);

    const token = await this.generateToken({
      email: user.email,
      sub: user.id,
    } as unknown as JwtPayloadI);

    const userObj = (user as any).toObject();
    delete userObj.password;
    delete userObj.salt;

    return {
      message: Message.createdSuccess('User'),
      user: userObj,
      token,
    };
  }

  private async createUser(registerDto: RegisterDto, queryRunner: QueryRunner) {
    const user = new User();

    const salt = await bcrypt.genSalt(10);
    user.email = registerDto.email;
    user.salt = salt;
    user.password = await bcrypt.hash(registerDto.password, salt);

    return queryRunner.manager.save(user);
  }
}
