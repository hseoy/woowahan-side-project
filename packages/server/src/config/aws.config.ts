import { registerAs } from '@nestjs/config';

const awsConfig = registerAs('aws', () => ({
  bucket: {
    name: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
  },
  credentials: {
    profile: process.env.AWS_CREDENTIALS_PROFILE,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}));

export default awsConfig;
