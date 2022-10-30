import { Project } from '../entities/project.entity';

export class ProjectDto extends Project {
  authorUserId: number;
  contributorIdOrNameList: (string | number)[];
}
