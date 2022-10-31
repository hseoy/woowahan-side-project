import { client } from '../client';
import { CreateOrUpdateDto } from '../dto';
import { LikeDto, LikeListDto, CreateLikeDto } from './dto';

export const requestCreateLike = async (data: CreateLikeDto) =>
  client.post<CreateOrUpdateDto>('/likes', data);

export const requestGetLikeList = async (projectId?: number) => {
  const response = await client.get<LikeListDto>('/likes', {
    params: { projectId },
  });
  return response;
};

export const requestGetLike = async (commentId: number) => {
  const response = await client.get<LikeDto>(`/likes/${commentId}`);
  return response;
};

export const requestDeleteLike = async (commentId: number) =>
  client.delete(`/likes/${commentId}`);
