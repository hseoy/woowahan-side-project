import { atom, useRecoilState } from 'recoil';
import { CreateProjectDto, requestCreateProject } from '@/apis/projects';

type ProjectItemModalState = {
  isOpen: boolean;
  projectItem: CreateProjectDto;
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

  const openModal = (projectItem?: CreateProjectDto) => {
    setProjectItemModalState({
      isOpen: true,
      projectItem: { ...initialProjectItem, ...projectItem },
    });
  };

  const closeModal = (projectItem?: CreateProjectDto) => {
    setProjectItemModalState({
      isOpen: false,
      projectItem: { ...initialProjectItem, ...projectItem },
    });
  };

  const modifyProjectItem = (projectItem: Partial<CreateProjectDto>) => {
    setProjectItemModalState(prev => ({
      ...prev,
      projectItem: { ...prev.projectItem, ...projectItem },
    }));
  };

  const onModalSubmit = async () => {
    await requestCreateProject(projectItemModalState.projectItem);
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
