import { atom, useRecoilState } from 'recoil';
import {
  ProjectItemDto,
  ProjectItemListDto,
  requestCreateProject,
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

  const addProjectItem = async (item: ProjectItemDto) => {
    const response = await requestCreateProject(item);
    setProjectListState(prev => [...prev, response.data]);
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
