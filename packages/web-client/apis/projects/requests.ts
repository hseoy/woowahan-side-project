import { client } from '../client';
import { CreateOrUpdateDto } from '../dto';
import { CreateProjectDto, ProjectItemDto, ProjectListDto } from './dto';

export const requestGetProjectList = async () => {
  const response = await client.get<ProjectListDto>('/projects');
  return response;
};

export const requestCreateProject = async (data: CreateProjectDto) =>
  client.post<CreateOrUpdateDto>('/projects', data);

export const requestGetProjectItem = async (id: number) =>
  client.get<ProjectItemDto>(`/projects/${id}`);
