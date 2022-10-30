export class ProjectDto {
  name: string;
  description: string;
  authorUserId: number;
  contributorIdOrNameList: (string | number)[];
  platform: 'app' | 'web' | 'etc';
  etcDeployLink?: string;
  webDeployLink?: string;
  androidDeployLink?: string;
  iosDeployLink?: string;
  githubLink?: string;
  backgroundImg?: string;
}
