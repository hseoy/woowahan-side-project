import { createAxiosHTTPClient } from '@woowahan-side-project/http-client';
import { config } from '@/config';

const baseURL = config.apiUrl;
export const client = createAxiosHTTPClient({ baseURL, withCredentials: true });
