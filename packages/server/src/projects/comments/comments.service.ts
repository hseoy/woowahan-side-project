import { CreateOrUpdateDto } from '@/dto/CreateOrUpdate.dto';
import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CommentItemDto } from './dto/comment-item.dto';
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
    const comment = await this.commentRepository.findOneBy({ id: commentId });

    return comment.userId === userId;
  }

  async countCommentCntByProjectId(projectId: number) {
    const cnt = await this.commentRepository.countBy({ projectId });
    return cnt;
  }

  async commentEntityToCommentItemDto(
    comment: Comment,
  ): Promise<CommentItemDto> {
    const authorUser = await this.usersService.findOneById(comment.userId);
    if (!authorUser) {
      throw new NotFoundException();
    }
    const project = await this.projectRepository.findOneBy({
      id: comment.projectId,
    });
    if (!project) {
      throw new NotFoundException();
    }

    const commentItemDto: CommentItemDto = {
      id: comment.id,
      message: comment.message,
      projectId: comment.projectId,
      projectName: project.name,
      isAnonymous: comment.isAnonymous,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      authorUsername: authorUser.username,
      authorProfileImg: authorUser.profileImg,
      authorUserId: authorUser.id,
    };

    return commentItemDto;
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

    const { id } = await this.commentRepository.save(newComment);
    return { id };
  }

  async findAll(): Promise<CommentItemDto[]> {
    const comments = await this.commentRepository.find();
    const commentItemDtoList = await Promise.all(
      comments.map((comment) => this.commentEntityToCommentItemDto(comment)),
    );

    return commentItemDtoList;
  }

  async findOneById(id: number): Promise<CommentItemDto> {
    const comment = await this.commentRepository.findOneBy({ id });

    const commentItemDto = await this.commentEntityToCommentItemDto(comment);

    return commentItemDto;
  }

  async findByProjectId(projectId: number): Promise<CommentItemDto[]> {
    const comments = await this.commentRepository.findBy({
      project: { id: projectId },
    });

    const commentItemDtoList = await Promise.all(
      comments.map((comment) => this.commentEntityToCommentItemDto(comment)),
    );

    return commentItemDtoList;
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
