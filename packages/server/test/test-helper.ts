import { Repository } from 'typeorm';

export const getMockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
