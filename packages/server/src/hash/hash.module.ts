import { Module } from '@nestjs/common';
import { HashService } from './hash.service';

@Module({
  exports: [HashService],
  providers: [HashService],
})
export class HashModule {}
