import { HTTPResponse } from '@woowahan-side-project/http-client';
import { client } from '../client';
import { CreateProjectDto, ProjectDto, ProjectListDto } from './dto';

export const requestGetProjectList = async () => {
  const response = await client.get<ProjectListDto>('/projects');
  return response;
};

export const requestCreateProject = async (
  data: CreateProjectDto,
): Promise<HTTPResponse<ProjectDto>> => client.post('/projects', data);
