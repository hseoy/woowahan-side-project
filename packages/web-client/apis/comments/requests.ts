import { client } from '../client';
import { CreateOrUpdateDto } from '../dto';
import { CommentListDto, CreateCommentDto } from './dto';

export const requestCreateComment = async (data: CreateCommentDto) =>
  client.post<CreateOrUpdateDto>('/comments', data);

export const requestGetCommentList = async (projectId: number) => {
  const response = await client.get<CommentListDto>('/comments', {
    params: { projectId },
  });
  return response;
};
