import React from 'react';
import SideProjectListContainer from '@/components/side-project/SideProjectListContainer';
import PageLayout from '@/components/layout/PageLayout';

function Home() {
  return (
    <PageLayout>
      <SideProjectListContainer />
    </PageLayout>
  );
}

export default Home;
