import { Button, Center, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Header from '@/components/common/Header';
import Nav from '@/components/common/Nav';
import LogoLink from '../service/LogoLink';
import Sidebar from './Sidebar';
import WoowaBanner from '../banner/WoowaBanner';
import WoowaconBanner from '../banner/WoowaconBanner';
import ProjectAddButton from '../project/ProjectAddButton';
import ProjectItemModifyModal from '../project/ProjectItemModifyModal';
import GoogleLoginButton from '../auth/GoogleLoginButton';
import useAuth from '@/hooks/use-auth';

type PageLayoutProps = {
  children: React.ReactNode;
};

function PageLayout({ children }: PageLayoutProps): JSX.Element {
  const [isRequestedAuthInfo, setIsRequestedAuthInfo] = useState(false);
  const { user, refreshToken, getMe, logout } = useAuth();

  useEffect(() => {
    refreshToken()
      .then(getMe)
      .catch(() => null)
      .then(() => setIsRequestedAuthInfo(true));
  }, []);

  const userInfoComponent = (() => {
    if (!isRequestedAuthInfo) {
      return <Spinner />;
    }
    return user ? (
      <>
        <ProjectAddButton />
        <Text paddingLeft="20px" fontSize="14px" fontFamily="dohyeon">
          {user?.username}
        </Text>
        <Button onClick={logout}>Logout</Button>
      </>
    ) : (
      <GoogleLoginButton />
    );
  })();

  return (
    <Stack width="100%" height="100%">
      <Header>
        <LogoLink href="/" />
        <Nav />
        <Center>{userInfoComponent}</Center>
      </Header>
      <ContentWrapper>
        <Flex height="100%">
          {children}
          <Sidebar>
            <WoowaBanner />
            <WoowaconBanner />
          </Sidebar>
        </Flex>
      </ContentWrapper>
      <ProjectItemModifyModal />
    </Stack>
  );
}

export default PageLayout;
