import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '@/auth/types';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt-access-token'))
  create(
    @Body() createProjectDto: Omit<CreateProjectDto, 'authorUserId'>,
    @Req() req: { user: JwtPayload },
  ) {
    const authorUserId = req.user.sub;
    return this.projectsService.create({ ...createProjectDto, authorUserId });
  }

  @Get()
  @UseGuards(AuthGuard('jwt-access-token'))
  findAll(@Req() req: { user: JwtPayload }) {
    const userId = req.user.sub;
    return this.projectsService.findAll({ userId });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  findOne(@Param('id') id: string) {
    return this.projectsService.findOneById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @Post('/:id/background-image')
  @UseGuards(AuthGuard('jwt-access-token'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadBackgroundImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const backgroundImageLink =
      await this.projectsService.uploadBackgroundImage({
        ...file,
        projectId: +id,
      });

    return backgroundImageLink;
  }
}
