import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockRepository, MockRepository } from '@test/test-helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

const mockUserList: User[] = [
  {
    id: 1,
    username: 'user 1',
    email: 'user1@example.com',
    createdAt: new Date('2000-01-01'),
    updatedAt: new Date('2000-02-02'),
  },
  {
    id: 2,
    username: 'user 2',
    email: 'user2@example.com',
    createdAt: new Date('2001-01-01'),
    updatedAt: new Date('2001-02-02'),
  },
];

const mockCreateUser: CreateUserDto = {
  username: 'someone',
  email: 'someone@example.com',
};

const mockUpdateUser: UpdateUserDto = {
  username: 'other name',
};

const mockId = 1;

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: getMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('Define되어야 합니다.', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('UserService.create', () => {
    it('사용자를 생성할 수 있어야 합니다.', async () => {
      userRepository.save.mockResolvedValueOnce(mockCreateUser);

      const createdUser = await service.create(mockCreateUser);

      expect(userRepository.create).toHaveBeenCalledWith(mockCreateUser);
      expect(userRepository.save).toHaveBeenCalled();

      expect(createdUser).toEqual(mockCreateUser);
    });
  });

  describe('UserService.findAll', () => {
    it('전체 사용자 목록을 가지고 올 수 있어야 합니다.', async () => {
      userRepository.find.mockResolvedValueOnce(mockUserList);

      const userList = await service.findAll();

      expect(userList).toEqual(mockUserList);
    });
  });

  describe('UserService.findOne', () => {
    it('해당하는 id를 지닌 사용자를 가지고 올 수 있어야 합니다.', async () => {
      userRepository.findOneBy.mockResolvedValueOnce(mockUserList[0]);

      const user = await service.findOne(mockId);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: mockId });
      expect(user).toEqual(mockUserList[0]);
    });
  });

  describe('UserService.update', () => {
    it('해당하는 id를 지닌 사용자를 업데이트할 수 있어야 합니다.', async () => {
      await service.update(mockId, mockUpdateUser);

      expect(userRepository.update).toHaveBeenCalledWith(
        mockId,
        mockUpdateUser,
      );
    });
  });

  describe('UserService.remove', () => {
    it('사용자를 삭제할 수 있어야 합니다.', async () => {
      service.remove(mockId);

      expect(userRepository.delete).toHaveBeenCalledWith(mockId);
    });
  });
});
