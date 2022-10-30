import { LikeEnum } from '../types';

export class CreateLikeDto {
  projectId: number;
  like: LikeEnum;
}
