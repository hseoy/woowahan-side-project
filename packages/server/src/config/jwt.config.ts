import { registerAs } from '@nestjs/config';

const databaseConfig = registerAs('jwt', () => ({
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '30m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  secret: process.env.JWT_SECRET,
}));

export default databaseConfig;
