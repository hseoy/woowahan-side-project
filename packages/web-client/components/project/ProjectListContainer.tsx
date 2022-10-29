import { Box, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import ProjectItem from './ProjectItem';
import useProjectList from '@/hooks/use-project-list';
import Scrollbar from '../scroll/ScrollBar';
import ProjectCommentsModal from './ProjectCommentsModal';

function ProjectListContainer(): JSX.Element {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    projectId: number;
  }>({
    isOpen: false,
    projectId: -1,
  });
  const { projectList } = useProjectList();

  const onClose = () => {
    setModalState({ isOpen: false, projectId: -1 });
  };

  const onOpen = (projectId: number) => {
    setModalState({ isOpen: true, projectId });
  };

  return (
    <Stack width="100%">
      <Heading as="h2" fontSize="24px" paddingBottom="20px">
        우리 구성원들이 만든 사이드 프로젝트들 👇
      </Heading>
      <Scrollbar withWindowScroll>
        <Stack gap="25px">
          {projectList?.map(item => (
            <Box key={item.id} onClick={() => onOpen(item.id)}>
              <ProjectItem {...item} />
            </Box>
          ))}
        </Stack>
      </Scrollbar>
      <ProjectCommentsModal
        isOpen={modalState.isOpen}
        projectId={modalState.projectId}
        onClose={onClose}
      />
    </Stack>
  );
}

export default ProjectListContainer;
