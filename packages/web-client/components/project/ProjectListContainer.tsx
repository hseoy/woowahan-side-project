import { Heading, Stack } from '@chakra-ui/react';
import ProjectItem from './ProjectItem';
import useProjectList from '@/hooks/use-project-list';

function ProjectListContainer(): JSX.Element {
  const { projectList } = useProjectList();

  return (
    <Stack width="100%">
      <Heading as="h2" fontSize="24px" paddingBottom="20px">
        우리 구성원들이 만든 사이드 프로젝트들 👇
      </Heading>
      <Stack gap="25px">
        {projectList?.map(item => (
          <ProjectItem key={item.id} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}

export default ProjectListContainer;
