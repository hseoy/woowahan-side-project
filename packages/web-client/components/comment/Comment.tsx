import { Avatar, Flex, Stack, Text } from '@chakra-ui/react';
import { CommentDto } from '@/apis/comments/dto';
import { getTimeSince } from '@/utils/date';

type CommentBlockProps = CommentDto;

function CommentBlock({
  authorUsername,
  authorProfileImg,
  message,
  createdAt,
}: CommentBlockProps): JSX.Element {
  return (
    <Flex width="100%">
      <Avatar
        src={authorProfileImg}
        size="sm"
        marginRight="8px"
        boxShadow="rgb(45, 45, 45, 0.6) 0px 0px 8px"
      />
      <Stack
        bgColor="blackAlpha.100"
        padding="10px 15px"
        width="100%"
        borderRadius="10px"
        borderTopLeftRadius="0px"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontStyle="bold">{authorUsername}</Text>
          <Text fontSize="sm" color="blackAlpha.600">
            {getTimeSince(createdAt)}
          </Text>
        </Flex>
        <Text color="gray.600">{message}</Text>
      </Stack>
    </Flex>
  );
}

export default CommentBlock;
