import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super(configService.get('oauth.google'));
  }

  validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const { id, name, emails, photos } = profile;

    return {
      provider: 'google',
      providerId: id,
      username: name.givenName,
      email: emails[0].value,
      profileImg: photos[0]?.value,
    };
  }
}
