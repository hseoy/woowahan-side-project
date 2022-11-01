import { Flex, Stack, Text, Box, Icon } from '@chakra-ui/react';
import Image from 'next/image';
// import ChatRightFill from '@/assets/svg/chat-right-fill.svg';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { mockImage } from '@/mock';
import { ProjectItemDto } from '@/apis/projects';
import LikeListContainer from '../project/LikeListContainer';
import { LikeDto, LikeEnum } from '@/apis/likes/dto';
import Tooltip from '../common/Tooltip';
import { IconMapper } from '../project/LikeBlock';
// import PlatformDeployLink from '../project/PlatformDeployLink';

type ProjectBlockProps = {
  /** @todo 현재 아직 구현되지 않은 기능입니다. */
  // commentCnt?: number;
  project: Partial<ProjectItemDto>;
};

const likeEnumList: LikeEnum[] = [
  LikeEnum.BEAUTY,
  LikeEnum.NEED,
  LikeEnum.FEEL,
  LikeEnum.STARTUP,
  LikeEnum.SHARE,
  LikeEnum.LIKE,
];

const Container = styled(Stack)`
  width: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  transition: 0.2s all ease;

  #link-select-container {
    transition: 0.2s all ease;
    opacity: 0;
  }

  :hover {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
    #link-select-container {
      opacity: 1;
    }
  }
`;

export default function ProjectBlock({
  project,
}: ProjectBlockProps): JSX.Element {
  const {
    // authorUsername,
    name,
    description,
    // githubLink,
    // androidDeployLink,
    // iosDeployLink,
    // webDeployLink,
    // etcDeployLink,
    // commentCnt,
    backgroundImg = undefined,
  } = project;

  const [likeList, setLikeList] = useState<LikeDto[]>(project.likeList || []);
  const isSelected = (like: LikeEnum) =>
    !!likeList.find(item => item.like === like);

  const handleLikeClick = (like: LikeEnum) => {
    if (isSelected(like)) {
      setLikeList(prev => prev.filter(item => item.like !== like));
      return;
    }

    const newLike: LikeDto = {
      createdAt: new Date(),
      id: Date.now(),
      like,
      projectId: -1,
      updatedAt: new Date(),
    };
    setLikeList([...likeList, newLike]);
  };

  return (
    <Container position="relative" style={{ marginTop: 0 }}>
      <Flex
        height="240px"
        borderTopLeftRadius="10px"
        borderTopRightRadius="10px"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          height="240px"
          width="100%"
          borderTopLeftRadius="10px"
          borderTopRightRadius="10px"
          backdropFilter="brightness(0.5)"
          filter="blur(30px)"
        >
          <Image
            src={backgroundImg || mockImage}
            alt="project name"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Box
          position="absolute"
          margin="20px"
          height="200px"
          borderRadius="5px"
          boxShadow="0px 0px 6px 2px rgba(255,255,255,0.25)"
          width="calc(100% - 40px)"
        >
          <Image
            src={backgroundImg || mockImage}
            alt="project name"
            layout="fill"
            objectFit="cover"
          />
        </Box>

        {/* 좋아요 표기 */}
        <LikeListContainer likeList={likeList || []} />

        {/* 그라데이션 박스 */}
        <Flex
          position="absolute"
          bottom={0}
          background="linear-gradient(rgba(0,0,0,0), rgba(75,75,75,60));"
          height="60px"
          width="100%"
          padding="15px 20px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text bottom={0} fontSize="24px" fontWeight="bold" color="#ffffff">
            {name}
          </Text>
          {/* <Text bottom={0} fontSize="20px" fontWeight="bold" color="#ffffff">
            {commentCnt}
          </Text> */}
        </Flex>
      </Flex>
      <Stack
        padding="20px"
        gap="16px"
        height="fit-content"
        style={{ marginTop: 0 }}
      >
        {/* <Flex justifyContent="space-between"> */}
        {/* 제작자  */}
        {/* <Text fontSize="16px" fontWeight="bold" color="brandPrimary">
            {authorUsername}
          </Text> */}

        {/* 플랫폼 아이콘 */}
        {/* <PlatformDeployLink
            etcDeployLink={etcDeployLink}
            githubLink={githubLink}
            androidDeployLink={androidDeployLink}
            iosDeployLink={iosDeployLink}
            webDeployLink={webDeployLink}
          /> */}
        {/* </Flex> */}

        {/* 프로젝트 설명 */}
        <Text fontSize="16px" color="brandPrimary" style={{ margin: 0 }}>
          {description}
        </Text>
      </Stack>
      <Box
        id="link-select-container"
        style={{ marginTop: 9, marginLeft: 9 }}
        position="absolute"
      >
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
          {likeEnumList.map((like, _) => (
            <Tooltip key={like} content={<Text>{like}</Text>}>
              <Icon
                as={IconMapper[like]}
                borderRadius="50%"
                cursor="pointer"
                onClick={() => handleLikeClick(like)}
                // backdropFilter="blur(10px)"
                filter={isSelected(like) ? undefined : 'grayscale(1)'}
                transition="0.2s all ease"
                width="32px"
                height="32px"
              />
            </Tooltip>
          ))}
        </Flex>
      </Box>
    </Container>
  );
}
