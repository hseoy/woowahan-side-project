import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { clientConfig, databaseConfig, jwtConfig, oauthConfig } from './config';
import { ProjectsModule } from './projects/projects.module';
import { S3Module } from './s3/s3.module';
import { CommentsModule } from './comments/comments.module';
import { LikeModule } from './like/like.module';
import awsConfig from './config/aws.config';

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
export class AppModule {}
