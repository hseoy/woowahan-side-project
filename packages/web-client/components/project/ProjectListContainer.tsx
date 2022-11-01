import {
  Box,
  Flex,
  Heading,
  Stack,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useProjectList from '@/hooks/use-project-list';
import ProjectCommentsModal from './ProjectCommentsModal';
import ProjectBlock from './ProjectBlock';
import { ProjectItemDto } from '@/apis/projects';
import zIndexes from '@/styles/zIndexes';

function ProjectListContainer(): JSX.Element {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    project: ProjectItemDto | null;
  }>({
    isOpen: false,
    project: null,
  });
  const { projectList, getProjectList } = useProjectList();

  const [isLargerThan1320] = useMediaQuery('(min-width: 1320px)');
  const [isLargerThan920] = useMediaQuery('(min-width: 920px)');
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const toast = useToast();

  const wspProjectList = projectList.filter(item => item.isWsp);
  const normalProjectList = projectList.filter(item => !item.isWsp);

  useEffect(() => {
    getProjectList().catch(() =>
      toast({
        title: '프로젝트 목록을 가지고 오지 못했습니다.',
        status: 'error',
        isClosable: true,
      }),
    );
  }, []);
  const onClose = () => {
    setModalState({ isOpen: false, project: null });
  };

  const onOpen = (project: ProjectItemDto) => {
    setModalState({ isOpen: true, project });
  };

  const getMaxWidth = () => {
    const boxWidth = 400;
    const gap = 30;

    if (isLargerThan1320) {
      return `${boxWidth * 3 + gap * 4}px`;
    }
    if (isLargerThan920) {
      return `${boxWidth * 2 + gap * 3}px`;
    }
    if (isLargerThan480) {
      return `${boxWidth * 1 + gap * 2}px`;
    }

    return `${boxWidth * 3 + gap * 4}px`;
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
      {wspProjectList.length > 0 ? (
        <>
          <Box
            style={{ marginTop: 0 }}
            padding="20px"
            position="sticky"
            top="0px"
            width="100%"
            textAlign="center"
            backdropFilter="blur(10px)"
            backgroundColor="#f1f2f5d4"
            zIndex={zIndexes.projectListHeading}
          >
            <Heading as="h2" fontSize="24px">
              우아한 사이드 프로젝트 기간(3달) 동안 작업한 프로젝트들 👇
            </Heading>
          </Box>
          <Flex
            gap="30px"
            width="100%"
            maxW={getMaxWidth()}
            justifyContent="start"
            flexWrap="wrap"
            style={{ marginTop: 8 }}
            padding="0px 30px 30px 30px"
          >
            {wspProjectList?.map(item => (
              <Box key={item.id} onClick={() => onOpen(item)}>
                <ProjectBlock key={item.id} project={item} />
              </Box>
            ))}
          </Flex>
        </>
      ) : null}

      {wspProjectList.length > 0 && normalProjectList.length > 0 ? (
        <Box
          width="100%"
          maxW="1280px"
          margin="20px 0"
          borderTop="1px solid #e4e4e4"
        />
      ) : null}

      {normalProjectList.length > 0 ? (
        <>
          <Box
            style={{ marginTop: 0 }}
            padding="20px"
            position="sticky"
            top="0px"
            width="100%"
            textAlign="center"
            backdropFilter="blur(10px)"
            backgroundColor="#f1f2f5d4"
            zIndex={zIndexes.projectListHeading}
          >
            <Heading as="h2" fontSize="24px">
              우아한형제들 구성원들의 프로젝트들 👇
            </Heading>
          </Box>
          <Flex
            gap="30px"
            width="100%"
            maxW={getMaxWidth()}
            justifyContent="start"
            flexWrap="wrap"
            style={{ marginTop: 8 }}
            padding="0px 30px 30px 30px"
          >
            {normalProjectList?.map(item => (
              <Box key={item.id} onClick={() => onOpen(item)}>
                <ProjectBlock key={item.id} project={item} />
              </Box>
            ))}
          </Flex>
        </>
      ) : null}
      <ProjectCommentsModal
        isOpen={modalState.isOpen}
        project={modalState.project}
        onClose={onClose}
      />
    </Stack>
  );
}

export default ProjectListContainer;
