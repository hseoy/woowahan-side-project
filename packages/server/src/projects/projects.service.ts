import { CreateOrUpdateDto } from '@/dto/CreateOrUpdate.dto';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsService } from './comments/comments.service';
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

  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
  ) {}

  async exists(id: number) {
    const cnt = await this.projectRepository.countBy({ id });
    return cnt > 0;
  }

  async isProjectOfUser(userId: number, projectId: number) {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    return project.userId === userId;
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
    const commentCnt = await this.commentsService.countCommentCntByProjectId(
      project.id,
    );
    const contributorUserList = await Promise.all(
      contributorList.map(async (contributor) => {
        if (contributor.contributorId) {
          const contributorUser = await this.usersService.findOneById(
            contributor.contributorId,
          );
          return {
            username: contributorUser.username,
            profileImg: contributorUser.profileImg,
          };
        }
        return { username: contributor.contributorName || '' };
      }),
    );

    const projectDto: ProjectDto = {
      id: project.id,
      name: project.name,
      description: project.description,
      platform: project.platform,
      etcDeployLink: project.etcDeployLink,
      webDeployLink: project.webDeployLink,
      androidDeployLink: project.androidDeployLink,
      iosDeployLink: project.iosDeployLink,
      githubLink: project.githubLink,
      backgroundImg: project.backgroundImg,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      isWsp: project.isWsp,
      authorUsername: project.user.username,
      authorUserId: project.user.id,
      contributorList: contributorUserList,
      commentCnt,
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
    const projects = await this.projectRepository.find({
      relations: { user: true },
    });

    const projectDtoList = await Promise.all(
      projects.map((project) => this.projectEntityToProjectDto(project)),
    );

    return projectDtoList;
  }

  async findOneById(id: number): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { user: true },
    });

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
