import { Button } from '@chakra-ui/react';
import CommonAlert from './CommonAlert';

type CommentDeleteAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

function CommentDeleteAlert({
  isOpen,
  onClose,
  onDelete,
}: CommentDeleteAlertProps) {
  const deleteHandler = () => {
    onClose();
    onDelete();
  };
  return (
    <CommonAlert isOpen={isOpen} onClose={onClose}>
      {{
        header: '피드백을 삭제하시겠어요?',
        content:
          '프로젝트 개발자에게 피드백은 도움이 됩니다. 이건 삭제해도 더 나은 피드백을 남겨주시리라 믿습니다.',
        footer: (
          <Button colorScheme="red" marginLeft="10px" onClick={deleteHandler}>
            삭제
          </Button>
        ),
      }}
    </CommonAlert>
  );
}

export default CommentDeleteAlert;
