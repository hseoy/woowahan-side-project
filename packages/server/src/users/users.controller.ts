import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '@/auth/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt-access-token'))
  getMe(@Req() req: { user: JwtPayload }) {
    const userEmail = req.user.email;

    return this.usersService.findOneByEmail(userEmail);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access-token'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/me/profile')
  @UseGuards(AuthGuard('jwt-access-token'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @Req() req: { user: JwtPayload },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const profileImageLink = await this.usersService.uploadProfileImage({
      ...file,
      email: req.user.email,
    });

    return profileImageLink;
  }
}
