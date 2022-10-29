import { Flex, Heading, Stack } from '@chakra-ui/react';
import useProjectList from '@/hooks/use-project-list';
import Scrollbar from '../scroll/ScrollBar';
import ProjectBlock from './ProjectBlock';

function ProjectListContainer(): JSX.Element {
  const { projectList } = useProjectList();

  return (
    <Stack width="100%">
      <Heading as="h2" fontSize="24px" paddingBottom="20px">
        우리 구성원들이 만든 사이드 프로젝트들 👇
      </Heading>
      <Scrollbar withWindowScroll>
        <Flex gap="30px" flexWrap="wrap">
          {projectList?.map(item => (
            <ProjectBlock key={item.id} {...item} />
          ))}
        </Flex>
      </Scrollbar>
    </Stack>
  );
}

export default ProjectListContainer;
