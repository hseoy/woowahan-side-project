import { Stack } from '@chakra-ui/react';
import useAuth from '@/hooks/use-auth';
import ContentWrapper from '../common/ContentWrapper';
import ProfileBackground from './ProfileBackground';
import ProfileUser from './ProfileUser';

function ProfileContainer() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Stack width="100%" style={{ margin: 0 }} position="relative">
      <ProfileBackground />
      <ContentWrapper style={{ margin: 0 }} height="auto">
        <ProfileUser user={user} transform="translateY(-50%)" />
      </ContentWrapper>
    </Stack>
  );
}

export default ProfileContainer;
