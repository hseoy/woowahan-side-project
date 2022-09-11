import { Heading, Stack } from '@chakra-ui/react';

function SideProjectListContainer(): JSX.Element {
  return (
    <Stack width="100%">
      <Heading as="h2" fontSize="24px">
        우리 구성원들이 만든 사이드 프로젝트들 👇
      </Heading>
    </Stack>
  );
}

export default SideProjectListContainer;
