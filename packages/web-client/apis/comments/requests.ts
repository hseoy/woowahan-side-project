import { client } from '../client';
import { CreateOrUpdateDto } from '../dto';
import {
  CommentDto,
  CommentListDto,
  CreateCommentDto,
  UpdateCommentDto,
} from './dto';

export const requestCreateComment = async (data: CreateCommentDto) =>
  client.post<CreateOrUpdateDto>('/comments', data);

export const requestGetCommentList = async (projectId?: number) => {
  const response = await client.get<CommentListDto>('/comments', {
    params: { projectId },
  });
  return response;
};

export const requestGetComment = async (commentId: number) => {
  const response = await client.get<CommentDto>(`/comments/${commentId}`);
  return response;
};

export const requestUpdateComment = async (
  commentId: number,
  data: UpdateCommentDto,
) => client.patch<CreateOrUpdateDto>(`/comments/${commentId}`, data);

export const requestDeleteComment = async (commentId: number) =>
  client.delete(`/comments/${commentId}`);
