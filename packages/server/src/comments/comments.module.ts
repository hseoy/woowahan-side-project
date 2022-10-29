import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UsersModule } from '@/users/users.module';
import { ProjectsModule } from '@/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, ProjectsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
