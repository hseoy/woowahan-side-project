import { HTTPResponse } from '@woowahan-side-project/http-client';
import { client } from '../client';
import { UserDto } from './dto';

export const requestGetMe = async (): Promise<HTTPResponse<UserDto>> =>
  client.get('/users/me');
