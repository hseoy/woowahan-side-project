import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CommentListDto, CreateCommentDto } from '@/apis/comments/dto';
import {
  requestCreateComment,
  requestDeleteComment,
  requestGetCommentList,
} from '@/apis/comments/requests';
import TextControl from '../form/TextControl';
import CommentBlock from '../comment/Comment';
import { ProjectItemDto } from '@/apis/projects';
import { mockImage } from '@/mock';
import useProjectList from '@/hooks/use-project-list';
import useAuth from '@/hooks/use-auth';

type ProjectCommentsModalProps = {
  isOpen: boolean;
  project: ProjectItemDto | null;
  onClose: () => void;
};
function ProjectCommentsModal({
  isOpen,
  project,
  onClose,
}: ProjectCommentsModalProps): JSX.Element {
  const [comments, setComments] = useState<CommentListDto>([]);
  const { handleSubmit, reset, control } = useForm({
    mode: 'onChange',
    defaultValues: { message: '' },
  });
  const { removeProjectItem, modifyProjectItemState } = useProjectList();
  const toast = useToast();
  const { user } = useAuth();

  const requestComments = async () => {
    if (!project) return;
    try {
      const response = await requestGetCommentList(project.id);
      const responseComments = response.data;
      setComments(responseComments.reverse());
      modifyProjectItemState({
        id: project.id,
        commentCnt: responseComments.length,
      });
    } catch {
      toast({
        title: '댓글 목록을 불러오지 못했습니다.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onSubmit = async ({ message }: { message: string }) => {
    if (!project) return;
    const data: CreateCommentDto = {
      message,
      projectId: project.id,
      isAnonymous: false,
    };
    await requestCreateComment(data);
    await requestComments();
    reset();
  };

  const onRemoveProjectItem = async () => {
    if (!project) return;

    try {
      await removeProjectItem(project.id);
      toast({
        title: '프로젝트가 삭제되었습니다.',
        status: 'success',
        isClosable: true,
      });
      onClose();
    } catch (e) {
      toast({
        title: '프로젝트가 삭제에 실패하였습니다.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const closeHandler = () => {
    onClose();
    reset();
  };

  const removeComment = async (commentId: number) => {
    try {
      await requestDeleteComment(commentId);
      await requestComments();

      toast({
        title: '댓글이 삭제되었습니다.',
        status: 'success',
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: '댓글을 삭제하지 못했습니다',
        status: 'error',
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (project && isOpen) {
      requestComments();
    }
  }, [project, isOpen]);

  return (
    <Drawer isOpen={isOpen} onClose={closeHandler} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <Stack height="100%" style={{ padding: '30px 20px' }} marginTop="20px">
          <Stack>
            <Flex
              height="240px"
              borderTopLeftRadius="10px"
              borderTopRightRadius="10px"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                height="240px"
                width="100%"
                borderTopLeftRadius="10px"
                borderTopRightRadius="10px"
                backdropFilter="brightness(0.5)"
                filter="blur(30px)"
              >
                <Image
                  src={project?.backgroundImg || mockImage}
                  alt="project name"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Box
                position="absolute"
                margin="20px"
                height="200px"
                borderRadius="5px"
                boxShadow="0px 0px 6px 2px rgba(255,255,255,0.25)"
                width="calc(100% - 40px)"
              >
                <Image
                  src={project?.backgroundImg || mockImage}
                  alt="project name"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>

              {/* 그라데이션 박스 */}
              <Flex
                position="absolute"
                bottom={0}
                background="linear-gradient(rgba(0,0,0,0), rgba(75,75,75,60));"
                height="60px"
                width="100%"
                padding="15px 20px"
                alignItems="baseline"
              >
                <Text
                  bottom={0}
                  fontSize="24px"
                  fontWeight="bold"
                  color="#ffffff"
                  marginRight="10px"
                >
                  {project?.name}
                </Text>
                <Text bottom={0} fontWeight="bold" color="#ffffff">
                  {project?.authorUsername}
                </Text>
              </Flex>
            </Flex>
          </Stack>

          <Box padding="10px 0 20px">
            <Text color="gray.500">{project?.description}</Text>
          </Box>

          <Box paddingBottom="25px">
            <Tooltip
              placement="top"
              bgColor="#505050"
              borderRadius="5px"
              label={
                project?.isWsp
                  ? '우아한사이드프로젝트 박람회 이후 삭제 가능합니다'
                  : '프로젝트를 삭제합니다'
              }
            >
              <Button
                onClick={onRemoveProjectItem}
                colorScheme="red"
                width="full"
                disabled={project?.isWsp}
              >
                프로젝트 삭제
              </Button>
            </Tooltip>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextControl
              name="message"
              requiredMsg={
                user
                  ? `${user?.username}님께서 피드백을 남겨주시면 개발자분들께서 정말 힘이 날 거에요!`
                  : `피드백을 남겨주시면 개발자분들께서 정말 힘이 날 거에요!`
              }
              label="프로젝트 개발자분들께 피드백을 전달해요"
              control={control}
              placeholder="피드백은 큰 힘이 됩니다!"
              required
            />
          </form>
          <Text fontFamily="dohyeon" color="gray.600" padding="10px 0">
            지금까지 {comments.length}개의 피드백이 달렸어요!
          </Text>
          <Stack overflowY="auto" padding="10px 10px">
            {comments.map(comment => (
              <CommentBlock
                // authorName="Hello"
                {...comment}
                key={comment.id}
                onClickDelete={removeComment}
              />
            ))}
          </Stack>
        </Stack>
      </DrawerContent>
    </Drawer>
  );
}

export default ProjectCommentsModal;
