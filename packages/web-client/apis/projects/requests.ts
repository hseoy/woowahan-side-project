import { HTTPResponse } from '@woowahan-side-project/http-client';
import { client } from '../client';
import { CreateProjectDto, ProjectDto, ProjectListDto } from './dto';

export const requestGetProjectList = async (): Promise<
  HTTPResponse<ProjectListDto>
> => {
  const response = await client.get<ProjectListDto>('/projects');
  return response;
};

export const requestCreateProject = async (
  data: CreateProjectDto,
): Promise<HTTPResponse<ProjectDto>> =>
  client.post<void, CreateProjectDto>('/projects', data);
