import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  create(createLikeDto: CreateLikeDto) {
    return 'This action adds a new like';
  }

  findAll() {
    return `This action returns all like 234234234`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
