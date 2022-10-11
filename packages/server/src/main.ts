import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { corsOrigin } from './utils/cors';

async function bootstrap() {
  const port = 3001;
  const app = await NestFactory.create(AppModule, {
    cors: { origin: corsOrigin, credentials: true },
  });

  setupSwagger(app);

  await app.listen(port);

  Logger.log(`Server Run on ${port}`);
}
bootstrap();
