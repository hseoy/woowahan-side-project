import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { S3Module } from '@/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), S3Module],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
