import { Center, Flex, Stack } from '@chakra-ui/react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Header from '@/components/common/Header';
import Nav from '@/components/common/Nav';
import LogoLink from '../service/LogoLink';
import Sidebar from './Sidebar';
import WoowaBanner from '../banner/WoowaBanner';
import WoowaconBanner from '../banner/WoowaconBanner';
import ProjectItemModifyModal from '../project/ProjectItemModifyModal';
import UserMenu from '../user/UserMenu';

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
  const contentComponent = (
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
          <UserMenu />
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
