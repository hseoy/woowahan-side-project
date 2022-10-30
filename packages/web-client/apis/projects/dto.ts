export type ProjectDto = {
  id: number;
  name: string;
  description: string;
  platform: 'app' | 'web' | 'etc';
  etcDeployLink?: string;
  webDeployLink?: string;
  androidDeployLink?: string;
  iosDeployLink?: string;
  githubLink?: string;
  backgroundImg?: string;
  createdAt: Date;
  updatedAt: Date;
  authorUsername: string;
  authorUserId: number;
  commentCnt: number;
  contributorList: { profileImg?: string; username: string }[];
  isWsp: boolean;
};

export type ProjectListDto = ProjectDto[];

export type ProjectItemDto = Omit<ProjectDto, 'createdAt' | 'updatedAt'>;

export type ProjectItemListDto = ProjectItemDto[];

export type CreateProjectDto = ProjectItemDto;

export type UpdateProjectDto = Partial<CreateProjectDto>;
