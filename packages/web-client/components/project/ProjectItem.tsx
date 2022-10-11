import { Flex, Stack, Text, Icon, Center } from '@chakra-ui/react';
import Image from 'next/image';
// import ChatRightFill from '@/assets/svg/chat-right-fill.svg';
import Link from 'next/link';
import { mockImage } from '@/mock';
import ArrowRightSquareFill from '@/assets/svg/arrow-right-square-fill.svg';

type ProjectItemProps = {
  author: string;
  name: string;
  description: string;
  deployLink?: string;
  /** @todo 현재 아직 구현되지 않은 기능입니다. */
  // commentCnt?: number;
};

function ProjectItem({
  author,
  name,
  description,
  deployLink,
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

      {deployLink && (
        <Link href={deployLink} passHref>
          <Center marginLeft="auto" cursor="pointer">
            <Icon
              as={ArrowRightSquareFill}
              color="logo"
              width="30px"
              height="30px"
            />
          </Center>
        </Link>
      )}
    </Flex>
  );
}

export default ProjectItem;
