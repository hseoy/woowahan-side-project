import { HTTPResponse } from '@woowahan-side-project/http-client';
import { client } from '../client';
import { RefreshAccessTokenDto } from './dto';

export const requestRefreshToken = async (): Promise<
  HTTPResponse<RefreshAccessTokenDto>
> => {
  const response = await client.get<RefreshAccessTokenDto>('/auth/refresh');

  const accessToken = response.data;

  client.setHeaderValue('Authorization', `Bearer ${accessToken}`);

  return response;
};

export const requestLogout = async (): Promise<void> => {
  await client.get('/auth/logout');

  client.setHeaderValue('Authorization', '');
};
