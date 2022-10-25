import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadProfileImageDto } from './dto/upload-profile-image.dto';
import { User } from './entities/user.entity';
import { S3Service } from '@/s3/s3.service';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  constructor(private s3Service: S3Service) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async getAccountType(createUserDto: CreateUserDto) {
    if (/woowahan.com/g.test(createUserDto.email)) {
      return 'woowahan';
    }
    if (/gmail.com/g.test(createUserDto.email)) {
      return 'google';
    }
    return 'unknown';
  }

  async findByProviderIdOrSave(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    }

    const accountType = await this.getAccountType(createUserDto);
    const newUser = await this.create({ ...createUserDto, accountType });
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async uploadProfileImage({ email, buffer, mimetype }: UploadProfileImageDto) {
    const key = uuidV4();

    await this.s3Service.createS3Object({
      key,
      buffer,
      mimetype,
    });

    const user = await this.findOneByEmail(email);
    user.profileImg = this.s3Service.getS3FullLink(key);
    await this.userRepository.update({ email }, user);

    return user.profileImg;
  }
}
