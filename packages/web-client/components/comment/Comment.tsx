import { Avatar, Flex, Stack, Text } from '@chakra-ui/react';
import { CommentDto } from '@/apis/comments/dto';
import { getTimeSince } from '@/utils/date';
import useAuth from '@/hooks/use-auth';

type CommentBlockProps = {
  onClickDelete: (commentId: number) => void;
} & CommentDto;

function CommentBlock({
  id,
  authorUserId,
  authorUsername,
  authorProfileImg,
  onClickDelete,
  message,
  createdAt,
  isAnonymous,
}: CommentBlockProps): JSX.Element {
  const { user } = useAuth();

  const onClick = () => onClickDelete(id);

  return (
    <Flex width="100%">
      <Avatar
        src={isAnonymous ? undefined : authorProfileImg}
        size="sm"
        marginRight="8px"
        boxShadow="rgb(45, 45, 45, 0.6) 0px 0px 8px"
      />
      <Stack width="100%">
        <Stack
          bgColor="blackAlpha.100"
          padding="10px 15px"
          borderRadius="10px"
          borderTopLeftRadius="0px"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontStyle="bold">
              {isAnonymous ? 'Anonymous' : authorUsername}
            </Text>
            <Text fontSize="sm" color="blackAlpha.600">
              {getTimeSince(createdAt)}
            </Text>
          </Flex>
          <Text color="gray.600">{message}</Text>
        </Stack>
        {user?.id === authorUserId && (
          <Flex>
            <Text
              fontSize="sm"
              color="gray.600"
              cursor="pointer"
              onClick={onClick}
              _hover={{ textDecoration: 'underline' }}
            >
              삭제
            </Text>
          </Flex>
        )}
      </Stack>
    </Flex>
  );
}

export default CommentBlock;
