import { registerAs } from '@nestjs/config';

const clientConfig = registerAs('client', () => ({
  webClientDomain: process.env.WEB_CLIENT_URL,
}));

export default clientConfig;
