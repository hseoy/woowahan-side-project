import { atom, useRecoilState } from 'recoil';

type ProjectItem = {
  author: string;
  name: string;
  description?: string;
  deployLink?: string;
  githubLink?: string;
};

type ProjectItemModalState = {
  isOpen: boolean;
  projectItem: ProjectItem;
};

const initialProjectItem = {
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

  const openModal = (projectItem?: ProjectItem) => {
    setProjectItemModalState({
      isOpen: true,
      projectItem: { ...initialProjectItem, ...projectItem },
    });
  };

  const closeModal = (projectItem?: ProjectItem) => {
    setProjectItemModalState({
      isOpen: false,
      projectItem: { ...initialProjectItem, ...projectItem },
    });
  };

  const modifyProjectItem = (projectItem: Partial<ProjectItem>) => {
    setProjectItemModalState(prev => ({
      ...prev,
      projectItem: { ...prev.projectItem, ...projectItem },
    }));
  };

  const onModalSubmit = () => {};

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
