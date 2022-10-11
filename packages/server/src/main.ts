import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  const port = 3001;
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:3000',
        'https://woowahan-side-project.hseoy.xyz/',
      ],
      credentials: true,
    },
  });

  setupSwagger(app);

  await app.listen(port);

  Logger.log(`Server Run on ${port}`);
}
bootstrap();
