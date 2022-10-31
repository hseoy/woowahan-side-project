import { CreateOrUpdateDto } from '@/dto/CreateOrUpdate.dto';
import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  @InjectRepository(Like)
  private likeRepository: Repository<Like>;

  @InjectRepository(Project)
  private projectRepository: Repository<Project>;

  constructor(private readonly usersService: UsersService) {}

  async create(
    userId: number,
    createLikeDto: CreateLikeDto,
  ): Promise<CreateOrUpdateDto> {
    const user = await this.usersService.findOneById(userId);
    const project = await this.projectRepository.findOneBy({
      id: createLikeDto.projectId,
    });

    if (!project) {
      throw new NotFoundException();
    }

    const newLike = this.likeRepository.create({
      ...createLikeDto,
      userId: user.id,
      projectId: project.id,
      user,
      project,
    });
    const { id } = await this.likeRepository.save(newLike);
    return { id };
  }

  findAll() {
    return this.likeRepository.find();
  }

  async findOneById(id: number) {
    const comment = await this.likeRepository.findOneBy({ id });
    return comment;
  }

  findByProjectId({
    projectId,
    userId,
  }: {
    projectId: number;
    userId: number;
  }) {
    return this.likeRepository.findBy({
      project: { id: projectId },
      user: { id: userId },
    });
  }

  remove(id: number) {
    return this.likeRepository.delete(id);
  }
}
