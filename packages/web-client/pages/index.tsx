import React, { useEffect } from 'react';
import ProjectListContainer from '@/components/project/ProjectListContainer';
import PageLayout from '@/components/layout/PageLayout';
import { ProjectListDto, requestGetProjectList } from '@/apis/projects';
import useProjectList from '@/hooks/use-project-list';

export async function getServerSideProps() {
  const response = await requestGetProjectList();
  return { props: { projectList: response.data } };
}
function Home({ projectList }: { projectList: ProjectListDto }) {
  const { setProjectList } = useProjectList();

  useEffect(() => {
    setProjectList(projectList);
  }, [projectList]);

  return (
    <PageLayout>
      <ProjectListContainer />
    </PageLayout>
  );
}

export default Home;
