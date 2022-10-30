import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { requestGetLikeList } from '@/apis/liks/requests';
import LikeBlock from './LikeBlock';
import { LikeDto, LikeEnum } from '@/apis/liks/dto';

type LikeListContainerProps = {
  projectId: number;
};
export default function LikeListContainer({
  projectId,
}: LikeListContainerProps): JSX.Element {
  const [likeList, setLikeList] = useState<LikeDto[]>([]);

  const requestLikes = async () => {
    const response = await requestGetLikeList(projectId);
    console.log('뭐오냐', response.data);
    // setLikeList(response.data);
    const newLikeList: LikeDto[] = [
      {
        id: 1,
        createdAt: new Date(),
        like: LikeEnum.BEAUTY,
        projectId,
        updatedAt: new Date(),
      },
      {
        id: 2,
        createdAt: new Date(),
        like: LikeEnum.NEED,
        projectId,
        updatedAt: new Date(),
      },
      {
        id: 3,
        createdAt: new Date(),
        like: LikeEnum.FEEL,
        projectId,
        updatedAt: new Date(),
      },
      {
        id: 4,
        createdAt: new Date(),
        like: LikeEnum.STARTUP,
        projectId,
        updatedAt: new Date(),
      },
      {
        id: 5,
        createdAt: new Date(),
        like: LikeEnum.SHARE,
        projectId,
        updatedAt: new Date(),
      },
      {
        id: 6,
        createdAt: new Date(),
        like: LikeEnum.LIKE,
        projectId,
        updatedAt: new Date(),
      },
    ];
    setLikeList(newLikeList);
  };

  // const onSubmit = async ({ message }: { message: string }) => {
  //   const data: CreateLikeDto = { message, projectId, isAnonymous: false };
  //   await requestCreateLike(data);
  //   await requestLikes();
  // };

  useEffect(() => {
    requestLikes();
  }, [projectId]);

  // 현재 좋아요 눌린 애들만 표기
  return (
    <Flex
      position="absolute"
      // background="linear-gradient( rgba(75,75,75,60),rgba(0,0,0,0));"
      height="fit-content"
      width="100%"
      padding="20px"
      gap="4px"
      alignItems="center"
    >
      {likeList?.map(item => (
        <LikeBlock key={item.id} {...item} />
      ))}
    </Flex>
  );
}
