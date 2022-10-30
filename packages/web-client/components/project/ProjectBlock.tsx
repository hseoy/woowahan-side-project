import { Flex, Stack, Text, Box } from '@chakra-ui/react';
import Image from 'next/image';
// import ChatRightFill from '@/assets/svg/chat-right-fill.svg';
import { mockImage } from '@/mock';
import { ProjectItemDto } from '@/apis/projects';
import PlatformDeployLink from './PlatformDeployLink';
import LikeListContainer from './LikeListContainer';

type ProjectBlockProps = {
  /** @todo 현재 아직 구현되지 않은 기능입니다. */
  // commentCnt?: number;
} & ProjectItemDto;

export default function ProjectBlock({
  id,
  authorUsername,
  name,
  description,
  githubLink,
  androidDeployLink,
  iosDeployLink,
  webDeployLink,
  etcDeployLink,
  commentCnt,
  backgroundImg = undefined,
}: // deployLink,
// githubLink,
ProjectBlockProps): JSX.Element {
  return (
    <Stack
      width="420px"
      backgroundColor="#ffffff"
      borderRadius={10}
      cursor="pointer"
      transition="0.3s all ease"
      _hover={{
        transform: 'scale(1.03)',
      }}
    >
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
        <LikeListContainer projectId={id} />

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
          <Text bottom={0} fontSize="20px" fontWeight="bold" color="#ffffff">
            {commentCnt}
          </Text>
        </Flex>
      </Flex>
      <Stack
        padding="20px"
        gap="16px"
        height="fit-content"
        style={{ marginTop: 0 }}
      >
        {/* 제작자 + 플랫폼 아이콘 */}
        <Flex justifyContent="space-between">
          <Text fontSize="16px" fontWeight="bold" color="brandPrimary">
            {authorUsername}
          </Text>
          <PlatformDeployLink
            etcDeployLink={etcDeployLink}
            githubLink={githubLink}
            androidDeployLink={androidDeployLink}
            iosDeployLink={iosDeployLink}
            webDeployLink={webDeployLink}
          />
        </Flex>
        <Text fontSize="16px" color="brandPrimary" style={{ margin: 0 }}>
          {description}
        </Text>

        {/* <Flex alignItems="center" marginTop="20px">
          <ChatRightFill color="#4B587C" width="12px" height="12px" />
          <Text fontSize="12px" color="brandPrimary" paddingLeft="5px">
            {`현재 구현되지 않은 기능입니다.(댓글 수 - ${commentCnt})`}
          </Text>
        </Flex> */}
      </Stack>

      {/* <Center marginLeft="auto" gap="10px">
        {githubLink && (
          <Center>
            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
              <Icon
                as={GithubIcon}
                width="25px"
                height="25px"
                color="lightGray"
              />
            </Link>
          </Center>
        )}

        {deployLink && (
          <Center>
            <Link href={deployLink} target="_blank" rel="noopener noreferrer">
              <Icon
                as={Link45degIcon}
                color="logo"
                width="25px"
                height="25px"
              />
            </Link>
          </Center>
        )}
      </Center> */}
    </Stack>
  );
}
