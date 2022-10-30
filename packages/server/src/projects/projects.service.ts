import { CreateOrUpdateDto } from '@/dto/CreateOrUpdate.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectItemDto } from './dto/create-project-item.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectContributor } from './entities/project-contributors.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  @InjectRepository(Project)
  private projectRepository: Repository<Project>;

  @InjectRepository(ProjectContributor)
  private projectContributorRepository: Repository<ProjectContributor>;

  async exists(id: number) {
    const cnt = await this.projectRepository.countBy({ id });
    return cnt > 0;
  }

  async isProjectOfUser(userId: number, projectId: number) {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    return project.authorId === userId;
  }
  private async addProjectContributors(
    projectId: number,
    contributorIdOrNameList: (string | number)[],
  ) {
    await Promise.all(
      contributorIdOrNameList.map(async (idOrName: string | number) => {
        const newProjectContributor = this.projectContributorRepository.create({
          projectId,
          contributorId: typeof idOrName === 'number' ? idOrName : null,
          contributorName: typeof idOrName === 'string' ? idOrName : null,
        });
        await this.projectContributorRepository.save(newProjectContributor);
      }),
    );
  }

  private async deleteProjectContributors(
    projectId: number,
    contributorIdOrNameList: (string | number)[],
  ) {
    await Promise.all(
      contributorIdOrNameList.map(async (idOrName: string | number) => {
        const item = await this.projectContributorRepository.findOneBy({
          projectId,
          contributorId: typeof idOrName === 'number' ? idOrName : null,
          contributorName: typeof idOrName === 'string' ? idOrName : null,
        });
        await this.projectContributorRepository.delete(item.id);
      }),
    );
  }

  private async upsertOrDeleteProjectContributors(
    projectId: number,
    contributorIdOrNameList: (string | number)[],
  ) {
    const contributorList = await this.projectContributorRepository.findBy({
      projectId,
    });
    const previousContributorIdOrNameList = contributorList.map(
      (contributor) => contributor.contributorId || contributor.contributorName,
    );

    const contributorListToDelete = previousContributorIdOrNameList.filter(
      (contributor) => contributorIdOrNameList.includes(contributor),
    );
    await this.deleteProjectContributors(projectId, contributorListToDelete);

    const contributorListToUpdate = previousContributorIdOrNameList.filter(
      (contributor) => contributorIdOrNameList.includes(contributor),
    );
    await this.addProjectContributors(projectId, contributorListToUpdate);
  }

  private createProject(createProjectItemDto: CreateProjectItemDto) {
    const newProject = this.projectRepository.create(createProjectItemDto);
    return this.projectRepository.save(newProject);
  }

  private async projectEntityToProjectDto(
    project: Project,
  ): Promise<ProjectDto> {
    const contributorList = await this.projectContributorRepository.findBy({
      projectId: project.id,
    });
    const contributorIdOrNameList = contributorList.map(
      (contributor) => contributor.contributorId || contributor.contributorName,
    );

    const projectDto: ProjectDto = {
      name: project.name,
      description: project.description,
      authorUserId: project.authorId,
      platform: project.platform,
      etcDeployLink: project.etcDeployLink,
      webDeployLink: project.webDeployLink,
      androidDeployLink: project.androidDeployLink,
      iosDeployLink: project.iosDeployLink,
      githubLink: project.githubLink,
      backgroundImg: project.backgroundImg,
      contributorIdOrNameList,
    };

    return projectDto;
  }

  async create(createProjectDto: CreateProjectDto): Promise<CreateOrUpdateDto> {
    const { contributorIdOrNameList, ...createProjectItemDto } =
      createProjectDto;

    const newProject = await this.createProject(createProjectItemDto);
    await this.addProjectContributors(newProject.id, contributorIdOrNameList);

    return { id: newProject.id };
  }

  async findAll(): Promise<ProjectDto[]> {
    const projects = await this.projectRepository.find();

    const projectDtoList = await Promise.all(
      projects.map((project) => this.projectEntityToProjectDto(project)),
    );

    return projectDtoList;
  }

  async findOneById(id: number): Promise<ProjectDto> {
    const project = await this.projectRepository.findOneBy({ id });

    const projectDto = this.projectEntityToProjectDto(project);

    return projectDto;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<CreateOrUpdateDto> {
    const { contributorIdOrNameList, ...updateProjectItemDto } =
      updateProjectDto;

    await this.upsertOrDeleteProjectContributors(id, contributorIdOrNameList);

    await this.projectRepository.update(id, updateProjectItemDto);

    return { id };
  }

  async remove(id: number) {
    await this.projectContributorRepository.delete({
      projectId: id,
    });

    await this.projectRepository.delete(id);
  }
}
