import { Flex, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { IconMapper } from './LikeBlock';
import { CreateLikeDto, LikeDto, LikeEnum } from '@/apis/liks/dto';
import {
  requestCreateLike,
  requestDeleteLike,
  requestGetLikeList,
} from '@/apis/liks/requests';
import useProjectList from '@/hooks/use-project-list';
import Tooltip from '../common/Tooltip';

type LinkSelectContainerProps = {
  projectId: number;
  likeList: LikeDto[];
  isWsp: boolean;
};

const likeEnumList: LikeEnum[] = [
  LikeEnum.BEAUTY,
  LikeEnum.NEED,
  LikeEnum.FEEL,
  LikeEnum.STARTUP,
  LikeEnum.SHARE,
  LikeEnum.LIKE,
];

export default function LinkSelectContainer({
  projectId,
  likeList,
  isWsp,
}: LinkSelectContainerProps): JSX.Element {
  const { projectList, setProjectList } = useProjectList();

  const isSelected = (like: LikeEnum) =>
    !!likeList.find(item => item.like === like);

  const getLike = (like: LikeEnum) => likeList.find(item => item.like === like);

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateLike = async (like: LikeEnum) => {
    setLoading(true);

    const data: CreateLikeDto = {
      like,
      projectId,
    };

    try {
      await requestCreateLike(data);
      const newLikeList = await requestGetLikeList(projectId);

      setProjectList(
        projectList.map(item => {
          if (item.id === projectId) {
            return { ...item, likeList: newLikeList.data };
          }
          return item;
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLike = async (like: LikeEnum) => {
    setLoading(true);
    const currentLike = getLike(like);
    if (currentLike === undefined) return;

    try {
      await requestDeleteLike(currentLike.id);
      const newLikeList = await requestGetLikeList(projectId);
      setProjectList(
        projectList.map(item => {
          if (item.id === projectId) {
            return { ...item, likeList: newLikeList.data };
          }
          return item;
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (like: LikeEnum) => {
    if (loading) return;

    if (isSelected(like)) {
      await handleDeleteLike(like);
      return;
    }

    await handleCreateLike(like);
  };

  // 현재 좋아요 눌린 애들만 표기
  return (
    <Flex
      height="fit-content"
      width="fit-content"
      backgroundColor="#ffffff"
      borderRadius="10px"
      padding="10px"
      gap="10px"
      alignItems="center"
      onClick={e => e.stopPropagation()}
    >
      {likeEnumList
        .filter(item => {
          if (!isWsp) {
            return item === LikeEnum.LIKE;
          }
          return true;
        })
        .map((like, _) => (
          <Tooltip key={like} content={<Text>{like}</Text>}>
            <Icon
              as={IconMapper[like]}
              borderRadius="50%"
              onClick={() => handleLike(like)}
              // backdropFilter="blur(10px)"
              filter={isSelected(like) ? undefined : 'grayscale(1)'}
              transition="0.2s all ease"
              width="32px"
              height="32px"
            />
          </Tooltip>
        ))}
    </Flex>
  );
}
