import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { HashModule } from '@/hash/hash.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserAuth]),
    HashModule,
  ],
  providers: [AuthService, GoogleStrategy],
  exports: [TypeOrmModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
