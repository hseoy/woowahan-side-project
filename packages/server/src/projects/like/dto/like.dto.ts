import { LikeEnum } from '../types';

export type LikeDto = {
  id: number;
  like: LikeEnum;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
};
