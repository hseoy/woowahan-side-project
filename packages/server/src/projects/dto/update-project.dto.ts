export class UpdateProjectDto {
  name?: string;
  description?: string;
  contributorIdOrNameList?: (string | number)[];
  platform?: 'app' | 'web' | 'etc';
  etcDeployLink?: string;
  webDeployLink?: string;
  androidDeployLink?: string;
  iosDeployLink?: string;
  githubLink?: string;
  backgroundImg?: string;
}
