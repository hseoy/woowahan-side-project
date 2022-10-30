import React from 'react';
import ProjectListContainer from '@/components/project/ProjectListContainer';
import PageLayout from '@/components/layout/PageLayout';

function Home() {
  return (
    <PageLayout withContentWrapper>
      <ProjectListContainer />
    </PageLayout>
  );
}

export default Home;
