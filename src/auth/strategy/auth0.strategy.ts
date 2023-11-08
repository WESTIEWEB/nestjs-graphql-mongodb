import { config } from 'dotenv';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-auth0';
import { ConfigService } from '@nestjs/config';

config();

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(config: ConfigService) {
    super({
      domain: config.get<string>('AUTH0_DOMAIN'),
      clientID: config.get<string>('AUTH0_CLIENT_ID'),
      clientSecret: config.get<string>('AUTH0_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/callback',
      state: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    return profile;
  }
}
