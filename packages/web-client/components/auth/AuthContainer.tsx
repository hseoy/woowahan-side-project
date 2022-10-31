import React, { useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import useAuth from '@/hooks/use-auth';
import LandingPageContainer from '../landing/LandingPageContainer';

type AuthContainerProps = {
  children: React.ReactNode;
};
export default function AuthContainer({
  children,
}: AuthContainerProps): JSX.Element {
  const toast = useToast();
  const count = useRef<number>(0);
  const { user, refreshToken, getMe, logout } = useAuth();

  useEffect(() => {
    count.current += 1;
    if (count.current === 1) {
      refreshToken()
        .then(getMe)
        .catch(() => null);
    }
  }, []);

  useEffect(() => {
    if (user && user.accountType !== 'woowahan') {
      toast({
        title: '사내 구성원을 대상으로 서비스가 제공되고 있습니다.',
        description: '사내 이메일(@woowahan.com)로 로그인 부탁드립니다.',
        position: 'top',
        duration: 3000,
        status: 'warning',
        isClosable: true,
      });
      logout();
    }
  }, [user]);

  if (!user || user.accountType !== 'woowahan') {
    return <LandingPageContainer />;
  }

  return <div>{children}</div>;
}
