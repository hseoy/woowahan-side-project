import { UserModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
