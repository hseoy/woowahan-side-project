import { atom, useRecoilState } from 'recoil';
import { ProjectItemDto } from '@/apis/projects';
import useProjectList from './use-project-list';

type ProjectItemModalState = {
  isOpen: boolean;
  projectItem: ProjectItemDto;
};

const initialProjectItem = {
  id: 0,
  author: '',
  name: '',
  description: '',
  deployLink: '',
  githubLink: '',
};

const projectItemModalAtom = atom<ProjectItemModalState>({
  key: 'use-project-item-modal/project-item-modal-state',
  default: {
    isOpen: false,
    projectItem: { ...initialProjectItem },
  },
});

const useProjectItemModal = () => {
  const [projectItemModalState, setProjectItemModalState] =
    useRecoilState(projectItemModalAtom);
  const { addProjectItem } = useProjectList();

  const openModal = (projectItem?: ProjectItemDto) => {
    setProjectItemModalState({
      isOpen: true,
      projectItem: { ...initialProjectItem, ...projectItem },
    });
  };

  const closeModal = (projectItem?: ProjectItemDto) => {
    setProjectItemModalState({
      isOpen: false,
      projectItem: { ...initialProjectItem, ...projectItem },
    });
  };

  const modifyProjectItem = (projectItem: Partial<ProjectItemDto>) => {
    setProjectItemModalState(prev => ({
      ...prev,
      projectItem: { ...prev.projectItem, ...projectItem },
    }));
  };

  const onModalSubmit = async () => {
    await addProjectItem(projectItemModalState.projectItem);
    closeModal();
  };

  const { isOpen, projectItem } = projectItemModalState;

  return {
    openModal,
    closeModal,
    modifyProjectItem,
    onModalSubmit,
    isOpen,
    projectItem,
  };
};

export default useProjectItemModal;
