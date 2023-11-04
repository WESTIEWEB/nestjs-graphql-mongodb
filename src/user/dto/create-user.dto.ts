import { Field, InputType } from '@nestjs/graphql';
import {
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  email: string;

  @IsPhoneNumber('NG', { message: 'Invalid phone number' })
  @Field()
  phone: string;

  @IsString()
  @MaxLength(20)
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number',
  })
  @Field()
  password: string;
}
