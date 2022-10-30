import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useProjectList from '@/hooks/use-project-list';
import ProjectCommentsModal from './ProjectCommentsModal';
import ProjectBlock from './ProjectBlock';
import { ProjectItemDto } from '@/apis/projects';

function ProjectListContainer(): JSX.Element {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    project: ProjectItemDto | null;
  }>({
    isOpen: false,
    project: null,
  });
  const { projectList, getProjectList } = useProjectList();

  useEffect(() => {
    getProjectList();
  }, []);
  const onClose = () => {
    setModalState({ isOpen: false, project: null });
  };

  const onOpen = (project: ProjectItemDto) => {
    setModalState({ isOpen: true, project });
  };

  return (
    <Stack
      width="100%"
      alignItems="center"
      backgroundColor="background"
      height="calc(100vh - 80px)"
      overflow="overlay"
      __css={{
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'mint.300',
          borderRadius: '100px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'mint.500',
        },
        '&::-webkit-scrollbar-thumb:focus': {
          background: 'mint.500',
        },
      }}
    >
      <Heading as="h2" fontSize="24px" paddingBottom="20px">
        우리 구성원들이 만든 사이드 프로젝트들 👇
      </Heading>
      {/* <Scrollbar withWindowScroll={!modalState.isOpen}> */}
      <Flex
        gap="30px"
        width="100%"
        maxW="1320px"
        justifyContent="center"
        flexWrap="wrap"
        style={{ marginTop: 0 }}
        paddingBottom="30px"
      >
        {projectList?.map(item => (
          <Box key={item.id} onClick={() => onOpen(item)}>
            <ProjectBlock key={item.id} {...item} />
          </Box>
        ))}
      </Flex>
      {/* </Scrollbar> */}
      <ProjectCommentsModal
        isOpen={modalState.isOpen}
        project={modalState.project}
        onClose={onClose}
      />
    </Stack>
  );
}

export default ProjectListContainer;
