export class CommentItemDto {
  id: number;
  message: string;
  projectId: number;
  projectName: string;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorUsername: string;
  authorProfileImg?: string;
  authorUserId: number;
}
