import { Module } from '@nestjs/common';
import { BookResolver } from './resolver';

@Module({
  providers: [BookResolver],
})
export class BookModule {}
