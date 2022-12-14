import { atom, useRecoilState } from 'recoil';
import {
  ProjectItemDto,
  requestUploadBackgroundImgFile,
} from '@/apis/projects';
import useProjectList from './use-project-list';

type ProjectItemModalState = {
  isOpen: boolean;
  projectItem: ProjectItemDto;
};

export const initialProjectItem: ProjectItemDto = {
  id: 0,
  name: '',
  description: '',
  platform: 'web',
  authorUsername: '',
  authorUserId: 0,
  commentCnt: 0,
  contributorList: [],
  likeList: [],
  isWsp: false,
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
  const { addProjectItem, addProjectItemToListState } = useProjectList();

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

  const onModalSubmit = async (
    data: ProjectItemDto & { backgroundImgFile?: File },
  ) => {
    const { backgroundImgFile, ...projectData } = data;
    const createdItem = await addProjectItem(projectData, true);
    if (backgroundImgFile) {
      const response = await requestUploadBackgroundImgFile(
        createdItem.id,
        backgroundImgFile,
      );
      if (response.data && typeof response.data === 'string') {
        addProjectItemToListState({
          ...createdItem,
          backgroundImg: response.data,
        });
      }
    } else {
      addProjectItemToListState(createdItem);
    }
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
