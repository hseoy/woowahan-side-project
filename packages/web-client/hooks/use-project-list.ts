import { atom, useRecoilState } from 'recoil';
import {
  CreateProjectDto,
  ProjectItemDto,
  ProjectItemListDto,
  requestCreateProject,
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

  const addProjectItem = async (item: ProjectItemDto) => {
    const createResponse = await requestCreateProject(
      projectItemDtoToCreateProjectDto(item),
    );
    const createdItemId = createResponse.data.id;

    const itemResponse = await requestGetProjectItem(createdItemId);
    const createdProjectItem = itemResponse.data;

    setProjectListState(prev => [...prev, createdProjectItem]);

    return createdItemId;
  };

  const setProjectList = (projectList: ProjectItemListDto) => {
    setProjectListState(projectList);
  };

  return {
    projectList: projectListState,
    setProjectList,
    getProjectList,
    addProjectItem,
  };
};

export default useProjectList;
