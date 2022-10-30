import * as path from 'path';
import {
  Injectable,
  Logger,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { clientConfig, databaseConfig, jwtConfig, oauthConfig } from './config';
import { ProjectsModule } from './projects/projects.module';
import { S3Module } from './s3/s3.module';
import { CommentsModule } from './projects/comments/comments.module';
import { LikeModule } from './projects/like/like.module';
import awsConfig from './config/aws.config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;

    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(
        `${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`,
      );
    });

    next();
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, oauthConfig, jwtConfig, clientConfig, awsConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
        url: configService.get<string>('database.url'),
        logging: configService.get<boolean>('database.logging'),
        synchronize: configService.get<boolean>('database.autoDDL'),
      }),
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    S3Module,
    CommentsModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
