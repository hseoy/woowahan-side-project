import { Button } from '@chakra-ui/react';
import useProjectItemModal from '@/hooks/use-project-item-modal';

function ProjectAddButton(): JSX.Element {
  const { openModal } = useProjectItemModal();

  return (
    <Button
      fontWeight="400"
      fontSize="18px"
      backgroundColor="transparent"
      onClick={() => openModal()}
    >
      프로젝트 추가
    </Button>
  );
}

export default ProjectAddButton;
