export type CommentDto = {
  id: number;
  message: string;
  projectId: number;
  projectName: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  authorUsername: string;
  authorProfileImg?: string;
  authorUserId: number;
};

export type CommentListDto = CommentDto[];

export type CreateCommentDto = {
  message: string;
  projectId: number;
  isAnonymous: boolean;
};

export type UpdateCommentDto = {
  message?: string;
  isAnonymous?: boolean;
};
