export type ProjectDto = {
  id: number;
  author: string;
  name: string;
  description: string;
  deployLink?: string;
  githubLink?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectListDto = ProjectDto[];

export type ProjectItemDto = Omit<ProjectDto, 'createdAt' | 'updatedAt'>;

export type ProjectItemListDto = ProjectItemDto[];

export type CreateProjectDto = ProjectItemDto;

export type UpdateProjectDto = Partial<CreateProjectDto>;
