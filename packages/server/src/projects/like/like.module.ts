import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UsersModule } from '@/users/users.module';
// import { ProjectsModule } from '@/projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Project } from '../entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Project]), UsersModule],
  controllers: [LikeController],
  exports: [LikeService],
  providers: [LikeService],
})
export class LikeModule {}
