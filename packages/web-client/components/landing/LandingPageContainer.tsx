import { Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { getProject } from '@/constants/landingPageProjects';
import LogoLink from '../service/LogoLink';
import UserMenu from '../user/UserMenu';
import ProjectBlock from './ProjectBlock';

export default function LandingPageContainer(): JSX.Element {
  return (
    <Stack
      style={{ marginTop: 0 }}
      width="100%"
      height="100vh"
      backgroundColor="#133638"
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        position="absolute"
        top="0px"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
        height="80px"
        padding="20px 40px"
        zIndex="2"
      >
        <Flex>
          <LogoLink href="/" />
        </Flex>
        <UserMenu />
      </Flex>

      {/* Body */}
      <Flex
        style={{ marginTop: 0 }}
        height="100vh"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        zIndex="1"
        padding="40px"
        gap="60px"
      >
        <ProjectBlock project={getProject()} />
        <Stack
          alignItems="start"
          justifyContent="start"
          style={{ marginTop: 0 }}
          maxWidth="500px"
          gap="16px"
        >
          <Stack
            style={{ marginTop: 0 }}
            alignItems="center"
            fontFamily="Spoqa Han Sans Neo"
            maxWidth="500px"
            width="100%"
            justifyContent="center"
            gap="0px"
          >
            <Text style={{ marginTop: 0 }} fontSize="42px" as="b" color="white">
              Welcome to
            </Text>
            <Text style={{ marginTop: 0 }} fontSize="42px" as="b" color="white">
              우아한 사이드 프로젝트!
            </Text>
          </Stack>

          <Text style={{ marginTop: 0 }} as="b" color="gray.200">
            🎁 이벤트 1 : 피드백으로 구성원들을 응원해주세요!
          </Text>
          <Text style={{ marginTop: -10 }} color="gray.200">
            5개 이상의 피드백(댓글 or 좋아요)를 남겨주신 구성원 분들에겐 추첨을
            통해 배민 선물하기 <Text as="b">10,000원</Text>을 보내드립니다!
          </Text>
          <Text style={{ marginTop: 0 }} as="b" color="gray.200">
            🎁 이벤트 2 : 개인 프로젝트를 등록해주세요!
          </Text>
          <Text style={{ marginTop: -10 }} color="gray.200">
            개인 사이드 프로젝트를 등록한 분에게도 추첨을 통해 배민 선물하기
            <br /> <Text as="b">10,000원</Text>을 보내드립니다!
          </Text>
          <Stack
            style={{ marginTop: 0 }}
            alignItems="center"
            maxWidth="500px"
            width="100%"
            justifyContent="center"
          >
            <UserMenu />
          </Stack>
        </Stack>
      </Flex>

      {/* 그라데이션 */}
      <Flex
        style={{ marginTop: 0 }}
        position="absolute"
        bottom={0}
        background="linear-gradient(rgba(0,0,0,0), rgba(30,30,30,100));"
        height="30%"
        width="100%"
        padding="15px 20px"
        alignItems="center"
        justifyContent="space-between"
      />
      <Flex
        style={{ marginTop: 0 }}
        position="absolute"
        top={0}
        background="linear-gradient(rgba(30,30,30,100), rgba(0,0,0,0));"
        height="30%"
        width="100%"
        padding="15px 20px"
        alignItems="center"
        justifyContent="space-between"
      />
    </Stack>
  );
}
