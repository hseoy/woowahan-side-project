import {
  Avatar,
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
import CommentDeleteAlert from '../alert/CommentDeleteAlert';
import ProjectDeleteAlert from '../alert/ProjectDeleteAlert';
import CheckboxControl from '../form/CheckboxControl';
import PlatformDeployLink from './PlatformDeployLink';

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
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'onChange',
    defaultValues: { message: '', isAnonymous: false },
  });
  const { removeProjectItem, modifyProjectItemState } = useProjectList();
  const toast = useToast();
  const { user } = useAuth();
  const [commentDeleteInfo, setCommentDeleteInfo] = useState({
    isOpen: false,
    commentId: -1,
  });
  const [projectDeleteInfo, setProjectDeleteInfo] = useState({
    isOpen: false,
    projectId: -1,
  });

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
        title: '????????? ????????? ???????????? ???????????????.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onSubmit = async ({
    message,
    isAnonymous,
  }: {
    message: string;
    isAnonymous: boolean;
  }) => {
    if (!project) return;
    try {
      const data: CreateCommentDto = {
        message,
        projectId: project.id,
        isAnonymous,
      };
      await requestCreateComment(data);
      await requestComments();
    } catch {
      toast({
        title: '????????? ????????? ?????????????????????',
        status: 'error',
        isClosable: true,
      });
    }
    setValue('message', '');
  };

  const onRemoveProjectItem = async () => {
    if (projectDeleteInfo.projectId === -1) return;

    try {
      await removeProjectItem(projectDeleteInfo.projectId);
      toast({
        title: '??????????????? ?????????????????????.',
        status: 'success',
        isClosable: true,
      });
      onClose();
    } catch (e) {
      toast({
        title: '??????????????? ????????? ?????????????????????.',
        status: 'error',
        isClosable: true,
      });
    }
  };
  const onOpenProjectDeleteAlert = () => {
    if (!project) return;
    setProjectDeleteInfo({ isOpen: true, projectId: project.id });
  };
  const onCloseProjectDeleteAlert = () => {
    setProjectDeleteInfo({ isOpen: false, projectId: -1 });
  };

  const closeHandler = () => {
    onClose();
    reset();
  };

  const onOpenCommentDeleteAlert = (commentId: number) => {
    setCommentDeleteInfo({ isOpen: true, commentId });
  };
  const onCloseCommentDeleteAlert = () => {
    setCommentDeleteInfo({ isOpen: false, commentId: -1 });
  };

  const removeComment = async () => {
    if (commentDeleteInfo.commentId === -1) return;

    try {
      await requestDeleteComment(commentDeleteInfo.commentId);
      await requestComments();

      toast({
        title: '???????????? ?????????????????????.',
        status: 'success',
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: '???????????? ???????????? ???????????????',
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
    <>
      <Drawer isOpen={isOpen} onClose={closeHandler} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Stack
            height="100%"
            style={{ padding: '30px 20px' }}
            marginTop="20px"
          >
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

                {/* ??????????????? ?????? */}
                <Flex
                  position="absolute"
                  bottom={0}
                  background="linear-gradient(rgba(0,0,0,0), rgba(75,75,75,60));"
                  height="60px"
                  width="100%"
                  padding="15px 20px"
                  alignItems="baseline"
                >
                  <Flex alignItems="center">
                    {project?.authorProfileImg ? (
                      <Avatar
                        style={{ marginTop: 0 }}
                        src={project?.authorProfileImg}
                        size="sm"
                        referrerPolicy="no-referrer"
                        marginRight="8px"
                      />
                    ) : null}
                    <Text
                      style={{ marginTop: 0 }}
                      fontSize="16px"
                      fontWeight="bold"
                      color="white"
                    >
                      {project?.authorUsername}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Stack>

            <Stack padding="10px 0 20px">
              <Text
                bottom={0}
                fontSize="24px"
                fontWeight="bold"
                marginRight="10px"
              >
                {project?.name}
              </Text>
              <Text color="gray.500">{project?.description}</Text>
              <PlatformDeployLink {...project} />
            </Stack>

            {user?.id === project?.authorUserId && (
              <Box paddingBottom="25px">
                <Tooltip
                  placement="top"
                  bgColor="#505050"
                  borderRadius="5px"
                  label={
                    project?.isWsp
                      ? '?????????????????????????????? ????????? ?????? ?????? ???????????????'
                      : '??????????????? ???????????????'
                  }
                >
                  <Button
                    onClick={onOpenProjectDeleteAlert}
                    colorScheme="red"
                    width="full"
                    disabled={project?.isWsp}
                  >
                    ???????????? ??????
                  </Button>
                </Tooltip>
              </Box>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex>
                <TextControl
                  name="message"
                  requiredMsg={
                    user
                      ? `${user?.username}????????? ???????????? ??????????????? ????????????????????? ?????? ?????? ??? ?????????!`
                      : `???????????? ??????????????? ????????????????????? ?????? ?????? ??? ?????????!`
                  }
                  label="???????????? ?????????????????? ???????????? ????????????"
                  control={control}
                  placeholder="???????????? ??? ?????? ?????????!"
                  isRequired
                  maxLength={255}
                  renderLabelRight={
                    <CheckboxControl
                      name="isAnonymous"
                      label="??????"
                      control={control}
                    />
                  }
                  renderInputRight={
                    <Button colorScheme="mint" type="submit" marginLeft="5px">
                      ??????
                    </Button>
                  }
                />
              </Flex>
            </form>
            <Text fontFamily="dohyeon" color="gray.600" padding="10px 0">
              ???????????? {comments.length}?????? ???????????? ????????????!
            </Text>
            <Stack overflowY="auto" padding="10px 10px">
              {comments.map(comment => (
                <CommentBlock
                  {...comment}
                  key={comment.id}
                  onClickDelete={onOpenCommentDeleteAlert}
                />
              ))}
            </Stack>
          </Stack>
        </DrawerContent>
      </Drawer>
      <CommentDeleteAlert
        isOpen={commentDeleteInfo.isOpen}
        onClose={onCloseCommentDeleteAlert}
        onDelete={removeComment}
      />
      <ProjectDeleteAlert
        isOpen={projectDeleteInfo.isOpen}
        onClose={onCloseProjectDeleteAlert}
        onDelete={onRemoveProjectItem}
      />
    </>
  );
}

export default ProjectCommentsModal;
