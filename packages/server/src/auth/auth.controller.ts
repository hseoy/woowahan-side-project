import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtPayload } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    // redirect google login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: { user: CreateUserDto },
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.usersService.findByProviderIdOrSave(req.user);

    const payload: JwtPayload = { sub: user.id, email: user.email };

    const { refreshToken } = this.authService.getToken(payload, {
      withRefresh: true,
      withAccess: false,
    });

    res.cookie('X-Refresh-Token', refreshToken);
    await this.authService.upsertRefreshToken(user, refreshToken);

    const webClientDomain = this.configService.get<string>(
      'client.webClientDomain',
    );
    res.redirect(webClientDomain);
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  async refreshAccessToken(
    @Req() req: { user: JwtPayload & { refreshToken: string } },
  ) {
    const { refreshToken } = req.user;

    const accessToken = this.authService.refreshAccessToken(refreshToken);

    return accessToken;
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.cookie('X-Refresh-Token', undefined);

    res.sendStatus(200);
  }
}
