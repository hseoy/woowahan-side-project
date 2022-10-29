import { CreateOrUpdateDto } from '@/dto/CreateOrUpdate.dto';
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

  constructor(private readonly usersService: UsersService) {}

  async isCommentOfUser(userId: number, commentId: number) {
    const comment = await this.findOneById(commentId);
    return comment.user.id === userId;
  }

  async create(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<CreateOrUpdateDto> {
    const user = await this.usersService.findOneById(userId);
    const { id } = this.commentRepository.create({
      ...createCommentDto,
      user,
    });
    return { id };
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOneById(id: number) {
    return this.commentRepository.findOneBy({ id });
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
