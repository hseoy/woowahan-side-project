import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import useProjectList from '@/hooks/use-project-list';
import Scrollbar from '../scroll/ScrollBar';
import ProjectBlock from './ProjectBlock';
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
        <Flex gap="30px" flexWrap="wrap">
          {projectList?.map(item => (
            <Box key={item.id} onClick={() => onOpen(item.id)}>
              <ProjectBlock key={item.id} {...item} />
            </Box>
          ))}
        </Flex>
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
