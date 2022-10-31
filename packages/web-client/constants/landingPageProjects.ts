import { LikeEnum } from '@/apis/likes/dto';
import { ProjectItemDto } from '@/apis/projects';

const url = [' ', ''];

export const getProject = (): Partial<ProjectItemDto> => ({
  id: Date.now(),
  name: '우아한 사이드 프로젝트',
  description:
    '우아한 사이드 프로젝트는 웹프론트 개발그룹에서 8월부터 진행한 하반기 프로그램입니다. 업무 외로 자기가 하고 싶은 프로젝트를 마음껏 진행하여 완성했어요. 구경오셔서 많은 피드백과 응원 부탁드려요!',
  // backgroundImg: '이미지',
  likeList: [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 0,
      projectId: 0,
      like: LikeEnum.BEAUTY,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 0,
      projectId: 0,
      like: LikeEnum.LIKE,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 0,
      projectId: 0,
      like: LikeEnum.NEED,
    },
  ],
  commentCnt: Math.floor(Math.random() * 100),
  androidDeployLink: url[Math.floor(Math.random() * 2)],
  githubLink: url[Math.floor(Math.random() * 2)],
  etcDeployLink: url[Math.floor(Math.random() * 2)],
  iosDeployLink: url[Math.floor(Math.random() * 2)],
  webDeployLink: url[Math.floor(Math.random() * 2)],
});
