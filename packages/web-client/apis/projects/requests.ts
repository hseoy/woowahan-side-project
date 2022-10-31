import axios from 'axios';
import { config } from '@/config';
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

export const requestDeleteProject = async (id: number) =>
  client.delete(`/projects/${id}`);

export const requestUploadBackgroundImgFile = async (
  id: number,
  file: File,
) => {
  const formData = new FormData();
  formData.append('file', file);

  /** @Todo HTTP-Client로 변경 */
  const auth = client.getHeaderValue('Authorization');
  await axios.post(
    `${config.apiUrl}/projects/${id}/background-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data;',
        Authorization: auth,
      },
    },
  );
};
