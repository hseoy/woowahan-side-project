import { Flex, Stack, Text, Icon, Center, Link } from '@chakra-ui/react';
import Image from 'next/image';
// import ChatRightFill from '@/assets/svg/chat-right-fill.svg';
import { mockImage } from '@/mock';
import Link45degIcon from '@/assets/svg/link-45deg.svg';
import GithubIcon from '@/assets/svg/github.svg';
import { ProjectItemDto } from '@/apis/projects';

type ProjectItemProps = {
  /** @todo 현재 아직 구현되지 않은 기능입니다. */
  // commentCnt?: number;
} & ProjectItemDto;

function ProjectItem({
  author,
  name,
  description,
  deployLink,
  githubLink,
}: ProjectItemProps): JSX.Element {
  return (
    <Flex width="100%" position="relative" paddingRight="25px">
      <Image src={mockImage} alt="project name" width="80px" height="80px" />
      <Stack padding="3px 13px" height="80px">
        <Flex alignItems="baseline" paddingBottom="7px">
          <Text
            fontSize="16px"
            fontWeight="bold"
            color="brandAccent"
            paddingRight="5px"
          >
            {name}
          </Text>
          <Text fontSize="12px" color="brandPrimary">
            @{author}
          </Text>
        </Flex>

        <Text fontSize="14px" color="brandPrimary" style={{ margin: 0 }}>
          {description}
        </Text>

        {/* <Flex alignItems="center" marginTop="20px">
          <ChatRightFill color="#4B587C" width="12px" height="12px" />
          <Text fontSize="12px" color="brandPrimary" paddingLeft="5px">
            {`현재 구현되지 않은 기능입니다.(댓글 수 - ${commentCnt})`}
          </Text>
        </Flex> */}
      </Stack>

      <Center marginLeft="auto" gap="10px">
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
      </Center>
    </Flex>
  );
}

export default ProjectItem;
