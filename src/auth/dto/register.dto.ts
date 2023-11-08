import { Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Field()
  @MaxLength(20)
  @MinLength(4)
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
  //   message:
  //     'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number',
  // })
  password: string;

  @IsPhoneNumber('NG', { message: 'Invalid phone number' })
  @Field()
  phone?: string;
}
