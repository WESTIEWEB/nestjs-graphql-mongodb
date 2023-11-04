import { IsString } from 'class-validator';
import { CreateAdminInput } from './create-admin.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @IsString()
  @Field()
  id: string;

  @Field()
  @IsString()
  firstName?: string;

  @IsString()
  @Field()
  lastName?: string;

  @Field({ nullable: true })
  role?: string;
}
