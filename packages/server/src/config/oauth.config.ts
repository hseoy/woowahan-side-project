import { registerAs } from '@nestjs/config';

const oauthConfig = registerAs('oauth', () => ({
  google: {
    clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.OAUTH_GOOGLE_SECRET,
    callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
    scope: ['email', 'profile'],
  },
}));

export default oauthConfig;
