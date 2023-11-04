import { ObjectType, Field } from '@nestjs/graphql';
import { CommonEntity } from 'src/common';
import { USERROLE } from 'src/common/interface';
import { Column, Entity, Unique } from 'typeorm';

@ObjectType()
@Entity()
@Unique(['email', 'phone'])
export class Admin extends CommonEntity {
  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  phone: string;

  @Field()
  @Column({ default: 'ADMIN', enum: USERROLE })
  role: USERROLE;
}
