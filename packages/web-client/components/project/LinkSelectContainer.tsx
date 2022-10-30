import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { IconColorMapper, IconMapper } from './LikeBlock';
import { CreateLikeDto, LikeDto, LikeEnum } from '@/apis/liks/dto';
import {
  requestCreateLike,
  requestDeleteLike,
  requestGetLikeList,
} from '@/apis/liks/requests';
import useProjectList from '@/hooks/use-project-list';

type LinkSelectContainerProps = {
  projectId: number;
  likeList: LikeDto[];
};

const likeEnumList: LikeEnum[] = [
  LikeEnum.BEAUTY,
  LikeEnum.NEED,
  LikeEnum.FEEL,
  LikeEnum.STARTUP,
  LikeEnum.SHARE,
  LikeEnum.LIKE,
];

const IconContainer = styled(Box)`
  transition: 0.2s all ease;
  border-radius: 50%;
  height: 32px;

  #icon-tooltip {
    transition: 0.2s all ease;
    left: 50%;
    top: -30px;
    padding: 4px 8px;
    color: #ffffff;
    border-radius: 5px;
    font-size: 14px;
    transform: translateX(-50%) translateY(0px);
    opacity: 0;
  }

  :hover {
    background-color: #00000016;

    #icon-tooltip {
      transform: translateX(-50%) translateY(-5px);
      opacity: 1;
    }
  }
`;

export default function LinkSelectContainer({
  projectId,
  likeList,
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
      {likeEnumList.map(like => (
        <IconContainer key={like} position="relative">
          <Icon
            as={IconMapper[like]}
            color={isSelected(like) ? IconColorMapper[like] : 'gray'}
            borderRadius="50%"
            onClick={() => handleLike(like)}
            backdropFilter="blur(10px)"
            width="32px"
            height="32px"
          />
          <Box
            id="icon-tooltip"
            position="absolute"
            backgroundColor="#505050"
            width="max-content"
          >
            <Text>{like}</Text>
          </Box>
        </IconContainer>
      ))}
    </Flex>
  );
}
