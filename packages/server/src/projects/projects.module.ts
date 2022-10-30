import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectContributor } from './entities/project-contributors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectContributor])],
  exports: [TypeOrmModule, ProjectsService],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
