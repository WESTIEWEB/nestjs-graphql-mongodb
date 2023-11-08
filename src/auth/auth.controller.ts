import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly autherService: AuthService) {}
  @Post('register')
  async register(@Body(ValidationPipe) body: RegisterDto) {
    return this.autherService.register(body);
  }

  @UseGuards(AuthGuard('auth0'))
  @Get('login')
  async login() {
    //
  }

  @Post('callback')
  async profile() {
    // return this.autherService.auth0callback(user);
  }
}
