import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectContributor } from './entities/project-contributors.entity';
import { UsersModule } from '@/users/users.module';
import { CommentsModule } from './comments/comments.module';
import { S3Module } from '@/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectContributor]),
    UsersModule,
    CommentsModule,
    S3Module,
  ],
  exports: [TypeOrmModule, ProjectsService],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
