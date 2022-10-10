import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HTTPClient } from './http-client';
import { HTTPHeaderValue, HTTPRequestConfig, HTTPResponse } from '@/types';
import { HTTPError, UnexpectedHTTPError } from '@/errors';

export class AxiosHTTPClient extends HTTPClient {
  private readonly client: AxiosInstance;

  private defaultRequestConfig: AxiosRequestConfig;

  constructor(client: AxiosInstance, defaultConfig?: AxiosRequestConfig) {
    super();
    this.client = client;
    this.defaultRequestConfig = defaultConfig || {};
  }

  async request<ResponseBodyT = unknown, RequestBodyT = unknown>(
    config: HTTPRequestConfig<RequestBodyT>,
  ): Promise<HTTPResponse<ResponseBodyT>> {
    try {
      const requestConfig: AxiosRequestConfig = {
        ...this.defaultRequestConfig,
        ...config,
      };
      const response = await this.client(requestConfig);

      const { data, status } = response;

      return { data, status };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const httpErrorResponse: HTTPResponse<ResponseBodyT> = {
          data: e.response?.data,
          status: e.response?.status || 500,
        };

        throw new HTTPError({
          message: e.message,
          response: e.response ? httpErrorResponse : undefined,
        });
      }

      throw new UnexpectedHTTPError();
    }
  }

  setHeaderValue(key: string, value: HTTPHeaderValue): void {
    this.defaultRequestConfig = {
      ...this.defaultRequestConfig,
      headers: {
        ...this.defaultRequestConfig.headers,
        [key]: value,
      },
    };
  }

  getHeaderValue(key: string) {
    const { headers } = this.defaultRequestConfig;
    return headers?.[key];
  }
}

export const createAxiosHTTPClient = (
  defaultConfig: AxiosRequestConfig,
): AxiosHTTPClient => {
  const client = axios.create();
  const axiosHTTPClient = new AxiosHTTPClient(client, defaultConfig);
  return axiosHTTPClient;
};
