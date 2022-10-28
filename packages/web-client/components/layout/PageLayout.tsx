import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Header from '@/components/common/Header';
import Nav from '@/components/common/Nav';
import LogoLink from '../service/LogoLink';
import Sidebar from './Sidebar';
import WoowaBanner from '../banner/WoowaBanner';
import WoowaconBanner from '../banner/WoowaconBanner';
import ProjectItemModifyModal from '../project/ProjectItemModifyModal';
import UserMenu from '../user/UserMenu';
import useAuth from '@/hooks/use-auth';
import GoogleLoginButton from '../auth/GoogleLoginButton';

type PageLayoutProps = {
  children: React.ReactNode;
  /** @default false */
  withSide?: boolean;
  /** @default false */
  withContentWrapper?: boolean;
};

function PageLayout({
  children,
  withSide,
  withContentWrapper,
}: PageLayoutProps): JSX.Element | null {
  const [isRequestedAuthInfo, setIsRequestedAuthInfo] = useState(false);
  const { user, refreshToken, getMe, logout } = useAuth();

  useEffect(() => {
    refreshToken()
      .then(getMe)
      .catch(() => null)
      .then(() => setIsRequestedAuthInfo(true));
  }, []);

  const warningComponent = (() => {
    if (!isRequestedAuthInfo) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return (
      <Stack>
        <Alert status={user ? 'error' : 'warning'}>
          <AlertIcon />
          현재는 사내 구성원을 대상으로 서비스가 제공되고 있습니다. 사내
          이메일(@woowahan.com)로 로그인 부탁드립니다.
        </Alert>
        {user ? (
          <Button onClick={logout}>로그아웃하기</Button>
        ) : (
          <GoogleLoginButton colorScheme={undefined} />
        )}
      </Stack>
    );
  })();

  const contentComponent =
    user?.accountType !== 'woowahan' ? (
      warningComponent
    ) : (
      <Flex height="100%" style={{ margin: 0 }}>
        {children}
        {withSide && (
          <Sidebar>
            <WoowaBanner />
            <WoowaconBanner />
          </Sidebar>
        )}
      </Flex>
    );

  return (
    <Stack width="100%" height="100%">
      <Header>
        <LogoLink href="/" />
        <Nav />
        <Center>
          <UserMenu isLoading={!isRequestedAuthInfo} />
        </Center>
      </Header>
      {withContentWrapper ? (
        <ContentWrapper withPadding>{contentComponent}</ContentWrapper>
      ) : (
        contentComponent
      )}
      <ProjectItemModifyModal />
    </Stack>
  );
}

export default PageLayout;
