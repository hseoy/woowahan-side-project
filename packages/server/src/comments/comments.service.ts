import { CreateOrUpdateDto } from '@/dto/CreateOrUpdate.dto';
import { ProjectsService } from '@/projects/projects.service';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  @InjectRepository(Comment)
  private commentRepository: Repository<Comment>;

  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  async isCommentOfUser(userId: number, commentId: number) {
    const comment = await this.findOneById(commentId);
    return comment.user.id === userId;
  }

  async create(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<CreateOrUpdateDto> {
    const user = await this.usersService.findOneById(userId);
    const project = await this.projectsService.findOneById(
      createCommentDto.projectId,
    );

    const newComment = this.commentRepository.create({
      ...createCommentDto,
      user,
      project,
    });
    const { id } = await this.commentRepository.save(newComment);
    return { id };
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOneById(id: number) {
    return this.commentRepository.findOneBy({ id });
  }

  findByProjectId(projectId: number) {
    return this.commentRepository.findBy({ project: { id: projectId } });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CreateOrUpdateDto> {
    await this.commentRepository.update(id, updateCommentDto);

    return { id };
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
