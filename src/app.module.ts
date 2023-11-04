import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from 'typeorm';
import { Book } from './book/entities';
import { User } from './user/entities';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }),
    BookModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '!2012Chisom',
      database: 'fyyur',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    AdminModule,
  ],
})
export class AppModule {}
