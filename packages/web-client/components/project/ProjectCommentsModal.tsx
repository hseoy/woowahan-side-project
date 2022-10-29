import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CommentListDto, CreateCommentDto } from '@/apis/comments/dto';
import {
  requestCreateComment,
  requestGetCommentList,
} from '@/apis/comments/requests';
import TextControl from '../form/TextControl';

type ProjectCommentsModalProps = {
  isOpen: boolean;
  projectId: number;
  onClose: () => void;
};
function ProjectCommentsModal({
  isOpen,
  projectId,
  onClose,
}: ProjectCommentsModalProps): JSX.Element {
  const [comments, setComments] = useState<CommentListDto>([]);
  const { handleSubmit, reset, control } = useForm({
    mode: 'onChange',
    defaultValues: { message: '' },
  });

  const requestComments = async () => {
    const response = await requestGetCommentList(projectId);
    setComments(response.data);
  };

  const onSubmit = async ({ message }: { message: string }) => {
    const data: CreateCommentDto = { message, projectId, isAnonymous: false };
    await requestCreateComment(data);
    await requestComments();
    reset();
  };

  useEffect(() => {
    requestComments();
  }, [projectId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <Stack height="80vh">
          {comments.map(comment => (
            <Flex key={comment.id}>
              <Text>{comment.message}</Text>
            </Flex>
          ))}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginTop: 'auto', padding: '30px 20px' }}
          >
            <TextControl
              name="message"
              label="Message"
              control={control}
              placeholder="프로젝트 개발자분들께 피드백을 전달해요"
              required
            />
          </form>
        </Stack>
      </ModalContent>
    </Modal>
  );
}

export default ProjectCommentsModal;
