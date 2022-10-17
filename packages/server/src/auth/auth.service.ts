import { HashService } from '@/hash/hash.service';
import { User } from '@/users/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly hashService: HashService,
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
  ) {}

  getToken(
    payload: JwtPayload,
    { withAccess, withRefresh } = { withAccess: true, withRefresh: true },
  ) {
    const accessExpiresIn = this.configService.get('jwt.accessExpiresIn');
    const refreshExpiresIn = this.configService.get('jwt.refreshExpiresIn');
    const secret = this.configService.get<string>('jwt.secret');

    const accessToken = (() => {
      if (withAccess) {
        return this.jwtService.sign(payload, {
          expiresIn: accessExpiresIn,
          secret: secret,
        });
      }
      return '';
    })();

    const refreshToken = (() => {
      if (withRefresh) {
        return this.jwtService.sign(payload, {
          expiresIn: refreshExpiresIn,
          secret: secret,
        });
      }
      return '';
    })();

    return { accessToken, refreshToken };
  }

  async upsertRefreshToken(user: User, refreshToken: string) {
    const userAuth = await this.userAuthRepository.findOneBy({
      user: { id: user.id },
    });
    const hashedRefreshToken = this.hashService.generateHash(refreshToken);

    if (userAuth) {
      userAuth.hashedRefreshToken = hashedRefreshToken;
      return this.userAuthRepository.save(userAuth);
    }

    const newUserAuth = this.userAuthRepository.create({
      user,
      hashedRefreshToken,
    });
    return this.userAuthRepository.save(newUserAuth);
  }

  async refreshAccessToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const { sub, email } = this.jwtService.decode(refreshToken) as JwtPayload;
    const { hashedRefreshToken } = await this.userAuthRepository.findOneBy({
      user: { email },
    });

    const isValid = this.hashService.compare(hashedRefreshToken, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const { accessToken } = this.getToken(
      { sub, email },
      { withAccess: true, withRefresh: false },
    );

    return accessToken;
  }
}
