import { CreateOrUpdateDto } from '@/dto/CreateOrUpdate.dto';
import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  @InjectRepository(Comment)
  private commentRepository: Repository<Comment>;

  @InjectRepository(Project)
  private projectRepository: Repository<Project>;

  constructor(private readonly usersService: UsersService) {}

  async isCommentOfUser(userId: number, commentId: number) {
    const comment = await this.findOneById(commentId);

    return comment.userId === userId;
  }

  async countCommentCntByProjectId(projectId: number) {
    const cnt = await this.commentRepository.countBy({ projectId });
    return cnt;
  }

  async create(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<CreateOrUpdateDto> {
    const user = await this.usersService.findOneById(userId);
    const project = await this.projectRepository.findOneBy({
      id: createCommentDto.projectId,
    });
    if (!project) {
      throw new NotFoundException();
    }

    const newComment = this.commentRepository.create({
      ...createCommentDto,
      userId: user.id,
      projectId: project.id,
      user,
      project,
    });

    console.log(newComment);

    const { id } = await this.commentRepository.save(newComment);
    return { id };
  }

  findAll() {
    return this.commentRepository.find();
  }

  async findOneById(id: number) {
    const comment = await this.commentRepository.findOneBy({ id });
    return comment;
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
