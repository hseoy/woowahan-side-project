export type UserDto = {
  id: number;
  username: string;
  email: string;
  accountType: string;
  providerId: string;
  profileImg?: string;
  createdAt: Date;
  updatedAt: Date;
};
