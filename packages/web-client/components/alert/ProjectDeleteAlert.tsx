import { Button } from '@chakra-ui/react';
import CommonAlert from './CommonAlert';

type ProjectDeleteAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

function ProjectDeleteAlert({
  isOpen,
  onClose,
  onDelete,
}: ProjectDeleteAlertProps) {
  const deleteHandler = () => {
    onClose();
    onDelete();
  };
  return (
    <CommonAlert isOpen={isOpen} onClose={onClose}>
      {{
        header: '프로젝트를 삭제하시겠어요?',
        content:
          '프로젝트를 삭제하면 해당 프로젝트 피드백 데이터까지 모두 삭제됩니다.',
        footer: (
          <Button colorScheme="red" marginLeft="10px" onClick={deleteHandler}>
            삭제
          </Button>
        ),
      }}
    </CommonAlert>
  );
}

export default ProjectDeleteAlert;
