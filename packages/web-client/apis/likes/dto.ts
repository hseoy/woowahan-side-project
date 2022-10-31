export type LikeDto = {
  id: number;
  like: LikeEnum;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
};

export enum LikeEnum {
  BEAUTY = '예뻐요',
  NEED = '필요했어요',
  FEEL = '느낌있어요',
  STARTUP = '창업하세요',
  SHARE = '공유하고싶어요',
  LIKE = '좋아요',
}

export type LikeListDto = LikeDto[];

export type CreateLikeDto = Pick<LikeDto, 'projectId' | 'like'>;
