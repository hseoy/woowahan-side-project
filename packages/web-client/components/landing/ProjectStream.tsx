import React from 'react';
import { Stack } from '@chakra-ui/react';
import { ProjectItemDto } from '@/apis/projects';
import ProjectBlock from './ProjectBlock';

type ProjectStreamProps = {
  projectList: Partial<ProjectItemDto>[];
};
export default function ProjectStream({
  projectList,
}: ProjectStreamProps): JSX.Element {
  return (
    <Stack style={{ marginTop: 0 }} gap="30px">
      {projectList.map(item => (
        <ProjectBlock key={item.id} project={item} />
      ))}
    </Stack>
  );
}
