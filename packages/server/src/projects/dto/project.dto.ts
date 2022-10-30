import { LikeDto } from '../like/dto/like.dto';

export class ProjectDto {
  id: number;
  name: string;
  description: string;
  platform: 'app' | 'web' | 'etc';
  etcDeployLink?: string;
  webDeployLink?: string;
  androidDeployLink?: string;
  iosDeployLink?: string;
  githubLink?: string;
  backgroundImg?: string;
  createdAt: Date;
  updatedAt: Date;
  authorUsername: string;
  authorUserId: number;
  commentCnt: number;
  likeList: LikeDto[];
  contributorList: { profileImg?: string; username: string }[];
  isWsp: boolean;
}
