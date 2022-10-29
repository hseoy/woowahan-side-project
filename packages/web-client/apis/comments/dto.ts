export type CommentDto = {
  id: number;
  message: string;
  projectId: number;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentListDto = CommentDto[];

export type CreateCommentDto = Omit<
  CommentDto,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateCommentDto = {
  message?: string;
  isAnonymous?: boolean;
};
