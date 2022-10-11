import { HTTPResponse } from '@/../http-client/dist';
import { client } from '../client';
import { CreateProjectDto, ProjectListDto } from './dto';

export const requestGetProjectList = async (): Promise<
  HTTPResponse<ProjectListDto>
> => {
  const response = await client.get<ProjectListDto>('/projects');
  return response;
};

export const requestCreateProject = async (data: CreateProjectDto) =>
  client.post<void, CreateProjectDto>('/projects', data);
