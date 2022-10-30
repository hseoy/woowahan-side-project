import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UsersModule } from '@/users/users.module';
import { Project } from '../entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Project]), UsersModule],
  controllers: [CommentsController],
  exports: [CommentsService],
  providers: [CommentsService],
})
export class CommentsModule {}
