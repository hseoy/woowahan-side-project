import { Flex, Stack, Text, Box, Avatar, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import styled from '@emotion/styled';
import React from 'react';
import IconFeedback from '@/assets/svg/fluent_comment_filled.svg';
import { mockImage } from '@/mock';
import { ProjectItemDto } from '@/apis/projects';
import PlatformDeployLink from './PlatformDeployLink';
import LikeListContainer from './LikeListContainer';
import LinkSelectContainer from './LinkSelectContainer';

type ProjectBlockProps = {
  project: ProjectItemDto;
  withoutLikeList?: boolean;
};

const Container = styled(Stack)`
  width: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
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
  withoutLikeList = false,
}: ProjectBlockProps): JSX.Element {
  const {
    id,
    authorUsername,
    name,
    description,
    authorProfileImg,
    githubLink,
    androidDeployLink,
    iosDeployLink,
    webDeployLink,
    likeList,
    etcDeployLink,
    commentCnt,
    backgroundImg = undefined,
  } = project;

  return (
    <Container position="relative">
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
        {likeList && likeList.length > 0 && !withoutLikeList && (
          <LikeListContainer likeList={likeList} />
        )}

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
          <Text
            bottom={0}
            fontSize="24px"
            fontWeight="bold"
            color="#ffffff"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {name}
          </Text>
          <Flex alignItems="center">
            <Icon
              as={IconFeedback}
              width="24px"
              height="24px"
              color="#ffffff"
              marginRight="4px"
            />
            <Text bottom={0} fontSize="18px" fontWeight="bold" color="#ffffff">
              {commentCnt}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Stack
        padding="20px"
        gap="16px"
        height="fit-content"
        style={{ marginTop: 0 }}
      >
        <Flex style={{ marginTop: 0 }} justifyContent="space-between">
          {/* 제작자  */}
          <Flex alignItems="center" gap="12px">
            {authorProfileImg ? (
              <Avatar
                style={{ marginTop: 0 }}
                src={authorProfileImg}
                size="sm"
                referrerPolicy="no-referrer"
              />
            ) : null}
            <Text
              style={{ marginTop: 0 }}
              fontSize="16px"
              fontWeight="bold"
              color="brandPrimary"
            >
              {authorUsername}
            </Text>
          </Flex>

          {/* 플랫폼 아이콘 */}
          <PlatformDeployLink
            etcDeployLink={etcDeployLink}
            githubLink={githubLink}
            androidDeployLink={androidDeployLink}
            iosDeployLink={iosDeployLink}
            webDeployLink={webDeployLink}
          />
        </Flex>

        {/* 프로젝트 설명 */}
        <Text fontSize="16px" color="brandPrimary" style={{ margin: 0 }}>
          {description}
        </Text>
      </Stack>

      {/* 좋아요 hover Container */}
      {!withoutLikeList && (
        <Box
          id="link-select-container"
          style={{ marginTop: 9, marginLeft: 9 }}
          position="absolute"
        >
          <LinkSelectContainer likeList={likeList} projectId={id} />
        </Box>
      )}
    </Container>
  );
}
