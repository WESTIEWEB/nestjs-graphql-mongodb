import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsPhoneNumber,
} from 'class-validator';

@InputType()
export class CreateAdminInput {
  @Field()
  @IsString()
  email: string;

  @IsString()
  @MaxLength(20)
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number',
  })
  @Field()
  password: string;

  @IsPhoneNumber('NG', { message: 'Invalid phone number' })
  @Field()
  phone: string;
}
