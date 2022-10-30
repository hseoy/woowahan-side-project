import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '@/auth/types';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt-access-token'))
  create(
    @Body() createLikeDto: CreateLikeDto,
    @Req() req: { user: JwtPayload },
  ) {
    const userId = req.user.sub;

    return this.likeService.create(userId, createLikeDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt-access-token'))
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  findOne(@Param('id') id: string) {
    return this.likeService.findOneById(+id);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt-access-token'))
  remove(@Param('id') id: string) {
    return this.likeService.remove(+id);
  }
}
