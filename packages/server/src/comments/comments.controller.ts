import { JwtPayload } from '@/auth/types';
import { ProjectsService } from '@/projects/projects.service';
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
  UnauthorizedException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly projectsService: ProjectsService,
  ) {}

  private throwWhenIsNotCommentOwn(userId: number, commentId: number) {
    const isOwnComment = this.commentsService.isCommentOfUser(
      userId,
      commentId,
    );
    if (!isOwnComment) {
      throw new UnauthorizedException();
    }
  }

  private throwWhenIsNotExistProject(projectId: number) {
    const isExistProject = this.projectsService.exists(projectId);
    if (!isExistProject) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt-access-token'))
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: { user: JwtPayload },
  ) {
    const userId = req.user.sub;

    this.throwWhenIsNotExistProject(createCommentDto.projectId);

    return this.commentsService.create(userId, createCommentDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt-access-token'))
  findAll(@Query('projectId') projectId?: string) {
    if (!projectId) {
      return this.commentsService.findAll();
    }
    return this.commentsService.findByProjectId(+projectId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  async findOne(@Param('id') id: string) {
    const comment = await this.commentsService.findOneById(+id);
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: { user: JwtPayload },
  ) {
    const userId = req.user.sub;

    this.throwWhenIsNotCommentOwn(userId, +id);

    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  async remove(@Param('id') id: string, @Req() req: { user: JwtPayload }) {
    const userId = req.user.sub;

    const comment = await this.commentsService.findOneById(+id);
    if (!comment) {
      throw new NotFoundException();
    }

    this.throwWhenIsNotCommentOwn(userId, +id);

    return this.commentsService.remove(+id);
  }
}
