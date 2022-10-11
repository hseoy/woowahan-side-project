import { Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ProjectListDto, requestGetProjectList } from '@/apis/projects';
import ProjectItem from './ProjectItem';

function ProjectListContainer(): JSX.Element {
  const [projectItems, setProjectItems] = useState<ProjectListDto>();

  const getProjectList = async () => {
    const response = await requestGetProjectList();

    setProjectItems(response.data);
  };
  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <Stack width="100%">
      <Heading as="h2" fontSize="24px" paddingBottom="20px">
        우리 구성원들이 만든 사이드 프로젝트들 👇
      </Heading>
      <Stack gap="25px">
        {projectItems?.map(item => (
          <ProjectItem key={item.id} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}

export default ProjectListContainer;
