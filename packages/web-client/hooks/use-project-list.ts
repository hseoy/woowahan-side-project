import { atom, useRecoilState } from 'recoil';
import {
  CreateProjectDto,
  ProjectItemDto,
  ProjectItemListDto,
  requestCreateProject,
  requestDeleteProject,
  requestGetProjectItem,
  requestGetProjectList,
} from '@/apis/projects';

type ProjectListState = ProjectItemListDto;

const projectListAtom = atom<ProjectListState>({
  key: 'use-project-list/project-list-state',
  default: [],
});

/** @todo Remove, Update Method 추가 */
const useProjectList = () => {
  const [projectListState, setProjectListState] =
    useRecoilState(projectListAtom);

  const getProjectList = async () => {
    const response = await requestGetProjectList();
    setProjectListState(response.data);
  };

  const projectItemDtoToCreateProjectDto = (
    item: ProjectItemDto,
  ): CreateProjectDto => {
    const createProjectDto: CreateProjectDto = {
      name: item.name,
      description: item.description,
      authorUserId: item.authorUserId,
      contributorIdOrNameList: [],
      platform: item.platform,
      etcDeployLink: item.etcDeployLink,
      webDeployLink: item.webDeployLink,
      androidDeployLink: item.androidDeployLink,
      iosDeployLink: item.iosDeployLink,
      githubLink: item.githubLink,
      backgroundImg: item.backgroundImg,
    };

    return createProjectDto;
  };

  const addProjectItemToListState = (item: ProjectItemDto) => {
    setProjectListState(prev => [...prev, item]);
  };

  const modifyProjectItemState = (
    item: Partial<ProjectItemDto> & { id: number },
  ) => {
    setProjectListState(prev =>
      prev.map(prevItem =>
        prevItem.id === item.id ? { ...prevItem, ...item } : prevItem,
      ),
    );
  };

  const addProjectItem = async (
    item: ProjectItemDto,
    withoutUpdateState = false,
  ) => {
    const createResponse = await requestCreateProject(
      projectItemDtoToCreateProjectDto(item),
    );
    const createdItemId = createResponse.data.id;

    const itemResponse = await requestGetProjectItem(createdItemId);
    const createdProjectItem = itemResponse.data;

    if (!withoutUpdateState) {
      addProjectItemToListState(createdProjectItem);
    }

    return createdProjectItem;
  };

  const removeProjectItem = async (itemId: number) => {
    await requestDeleteProject(itemId);

    setProjectListState(prev => [...prev.filter(item => item.id !== itemId)]);
  };

  const setProjectList = (projectList: ProjectItemListDto) => {
    setProjectListState(projectList);
  };

  return {
    projectList: projectListState,
    setProjectList,
    getProjectList,
    addProjectItem,
    removeProjectItem,
    addProjectItemToListState,
    modifyProjectItemState,
  };
};

export default useProjectList;
