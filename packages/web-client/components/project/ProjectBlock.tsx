import { Flex, Stack, Text, Icon, Box } from '@chakra-ui/react';
import Image from 'next/image';
// import ChatRightFill from '@/assets/svg/chat-right-fill.svg';
import { mockImage } from '@/mock';
import IconAndroid from '@/assets/svg/icon_android.svg';
import IconIos from '@/assets/svg/icon_ios.svg';
import IconWeb from '@/assets/svg/icon_web.svg';
import IconGithub from '@/assets/svg/icon_github.svg';
import { ProjectItemDto } from '@/apis/projects';

type ProjectBlockProps = {
  /** @todo 현재 아직 구현되지 않은 기능입니다. */
  // commentCnt?: number;
} & ProjectItemDto;

export default function ProjectBlock({
  author,
  name,
  description,
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
            src={mockImage}
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
            src={mockImage}
            alt="project name"
            layout="fill"
            objectFit="cover"
          />
        </Box>

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
            {15}
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
            {author}
          </Text>
          <Flex gap="12px">
            <Icon
              as={IconGithub}
              _hover={{ color: '#1a1a1a' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
            <Icon
              as={IconAndroid}
              _hover={{ color: '#35a700' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
            <Icon
              as={IconIos}
              _hover={{ color: '#555555' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
            <Icon
              as={IconWeb}
              _hover={{ color: '#005ed1' }}
              transition="0.2s color ease"
              color="iconColor"
              width="32px"
              height="32px"
            />
          </Flex>
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
