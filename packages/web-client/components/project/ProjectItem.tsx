import { Flex, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import ChatRightFill from '@/assets/svg/chat-right-fill.svg';
import { mockImage } from '@/mock';

type ProjectItemProps = {
  userName: string;
  project: {
    name: string;
    description: string;
  };
  commentCnt: number;
};

function ProjectItem({
  userName,
  project,
  commentCnt,
}: ProjectItemProps): JSX.Element {
  return (
    <Flex>
      <Image src={mockImage} alt="project name" width="80px" height="80px" />
      <Stack padding="3px 13px" height="80px">
        <Flex alignItems="baseline" paddingBottom="7px">
          <Text
            fontSize="16px"
            fontWeight="bold"
            color="brandAccent"
            paddingRight="5px"
          >
            {project.name}
          </Text>
          <Text fontSize="12px" color="brandPrimary">
            @{userName}
          </Text>
        </Flex>

        <Text fontSize="14px" color="brandPrimary" style={{ margin: 0 }}>
          {project.description}
        </Text>

        <Flex alignItems="center" marginTop="20px">
          <ChatRightFill color="#4B587C" width="12px" height="12px" />
          <Text fontSize="12px" color="brandPrimary" paddingLeft="5px">
            {commentCnt}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default ProjectItem;
