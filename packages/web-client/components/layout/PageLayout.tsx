import { Center, Flex, Stack, Text } from '@chakra-ui/react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Header from '@/components/common/Header';
import Nav from '@/components/common/Nav';
import LogoLink from '../service/LogoLink';
import Sidebar from './Sidebar';
import WoowaBanner from '../banner/WoowaBanner';
import WoowaconBanner from '../banner/WoowaconBanner';
import ProjectAddButton from '../project/ProjectAddButton';
import ProjectItemModifyModal from '../project/ProjectItemModifyModal';

type PageLayoutProps = {
  children: React.ReactNode;
};

function PageLayout({ children }: PageLayoutProps): JSX.Element {
  return (
    <Stack width="100%" height="100%">
      <Header>
        <LogoLink href="/" />
        <Nav />
        <Center>
          <ProjectAddButton />
          <Text paddingLeft="20px" fontSize="18px">
            사용자
          </Text>
        </Center>
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
