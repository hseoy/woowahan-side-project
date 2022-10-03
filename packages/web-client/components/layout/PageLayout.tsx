import { Stack, Text } from '@chakra-ui/react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Header from '@/components/common/Header';
import Nav from '@/components/common/Nav';
import LogoLink from '../service/LogoLink';

type PageLayoutProps = {
  children: React.ReactNode;
};

function PageLayout({ children }: PageLayoutProps): JSX.Element {
  return (
    <Stack>
      <Header>
        <LogoLink href="/" />
        <Nav />
        <Text>사용자</Text>
      </Header>
      <ContentWrapper>{children}</ContentWrapper>
    </Stack>
  );
}

export default PageLayout;
