import { registerAs } from '@nestjs/config';

const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  logging: process.env.DATABASE_LOGGING === 'true',
  autoDDL: process.env.DATABASE_AUTO_DDL === 'true',
}));

export default databaseConfig;
