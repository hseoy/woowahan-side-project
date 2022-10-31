import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import LogoLink from '../service/LogoLink';
import UserMenu from '../user/UserMenu';

type LandingPageContainerProps = {
  isRequestedAuthInfo: boolean;
};

export default function LandingPageContainer({
  isRequestedAuthInfo,
}: LandingPageContainerProps): JSX.Element {
  return (
    <Stack width="100%" height="100%">
      <Flex>
        <LogoLink href="/" />
      </Flex>
      <UserMenu isLoading={!isRequestedAuthInfo} />
    </Stack>
  );
}
