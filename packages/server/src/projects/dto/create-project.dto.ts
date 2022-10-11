export class CreateProjectDto {
  author: string;
  name: string;
  description: string;
  deployLink?: string;
  githubLink?: string;
}
