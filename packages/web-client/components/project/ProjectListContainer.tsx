import { Heading, Stack } from '@chakra-ui/react';
import ProjectItem from './ProjectItem';

const mockItems = [
  {
    id: 0,
    userName: 'tutoworld 1',
    project: {
      name: '우아챗',
      description: '우아한수다타임을 위해 직접 만든 우수타 웹 플랫폼',
    },
    commentCnt: 3,
    deployLink: 'https://woowahan-side-project.hseoy.xyz/',
  },
  {
    id: 1,
    userName: 'tutoworld 2',
    project: {
      name: '우아챗',
      description: '우아한수다타임을 위해 직접 만든 우수타 웹 플랫폼',
    },
    commentCnt: 20,
    deployLink: 'https://woowahan-side-project.hseoy.xyz/',
  },
  {
    id: 2,
    userName: 'tutoworld 3',
    project: {
      name: '우아챗',
      description: '우아한수다타임을 위해 직접 만든 우수타 웹 플랫폼',
    },
    commentCnt: 14,
    deployLink: 'https://woowahan-side-project.hseoy.xyz/',
  },
  {
    id: 3,
    userName: 'tutoworld 4',
    project: {
      name: '우아챗',
      description: '우아한수다타임을 위해 직접 만든 우수타 웹 플랫폼',
    },
    commentCnt: 15,
    deployLink: 'https://woowahan-side-project.hseoy.xyz/',
  },
];

function ProjectListContainer(): JSX.Element {
  return (
    <Stack width="100%">
      <Heading as="h2" fontSize="24px" paddingBottom="20px">
        우리 구성원들이 만든 사이드 프로젝트들 👇
      </Heading>
      <Stack gap="25px">
        {mockItems.map(item => (
          <ProjectItem key={item.id} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}

export default ProjectListContainer;
