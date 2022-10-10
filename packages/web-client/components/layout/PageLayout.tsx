import { Flex, Stack, Text } from '@chakra-ui/react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Header from '@/components/common/Header';
import Nav from '@/components/common/Nav';
import LogoLink from '../service/LogoLink';
import Sidebar from './Sidebar';
import WoowaBanner from '../banner/WoowaBanner';
import WoowaconBanner from '../banner/WoowaconBanner';

type PageLayoutProps = {
  children: React.ReactNode;
};

function PageLayout({ children }: PageLayoutProps): JSX.Element {
  return (
    <Stack width="100%" height="100%">
      <Header>
        <LogoLink href="/" />
        <Nav />
        <Text fontSize="18px">사용자</Text>
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
    </Stack>
  );
}

export default PageLayout;
