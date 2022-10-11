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

export type CreateProjectDto = Omit<
  ProjectDto,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateProjectDto = Partial<CreateProjectDto>;
