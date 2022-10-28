import { Avatar, Flex, Stack, StackProps, Text } from '@chakra-ui/react';
import { UserDto } from '@/apis/users';

type ProfileUserProps = {
  user: UserDto;
} & StackProps;

function ProfileUser({ user, ...stackProps }: ProfileUserProps): JSX.Element {
  return (
    <Stack {...stackProps}>
      <Avatar
        src={user.profileImg}
        boxShadow="rgb(45, 45, 45, 0.6) 0px 0px 8px"
        width="120px"
        height="120px"
        _hover={{ boxShadow: 'rgb(45, 45, 45, 0.8) 0px 0px 16px' }}
        transition="0.3s"
      />
      <Flex paddingTop="25px" alignItems="flex-end">
        <Text fontWeight="bold" fontSize="2xl">
          {user.username}
        </Text>
        <Text color="gray.400" fontSize="xl">
          {user.accountType}
        </Text>
      </Flex>
    </Stack>
  );
}

export default ProfileUser;
