import { HTTPHeaderValue, HTTPRequestConfig, HTTPResponse } from '@/types';

export abstract class HTTPClient {
  abstract setHeaderValue(key: string, value: HTTPHeaderValue): void;

  abstract getHeaderValue(key: string): HTTPHeaderValue | undefined;

  abstract request<
    ResponseBodyT = unknown,
    RequestQueryT = unknown,
    RequestBodyT = unknown,
  >(
    config: HTTPRequestConfig<RequestQueryT, RequestBodyT>,
  ): Promise<HTTPResponse<ResponseBodyT>>;

  async get<
    ResponseBodyT = unknown,
    RequestQueryT = unknown,
    RequestBodyT = unknown,
  >(
    url: string,
    config?: HTTPRequestConfig<RequestQueryT, RequestBodyT>,
  ): Promise<HTTPResponse<ResponseBodyT>> {
    return this.request<ResponseBodyT, RequestQueryT, RequestBodyT>({
      ...config,
      url,
      method: 'GET',
    });
  }

  async delete<
    ResponseBodyT = unknown,
    RequestQueryT = unknown,
    RequestBodyT = unknown,
  >(
    url: string,
    config?: HTTPRequestConfig<RequestQueryT, RequestBodyT>,
  ): Promise<HTTPResponse<ResponseBodyT>> {
    return this.request<ResponseBodyT, RequestQueryT, RequestBodyT>({
      ...config,
      url,
      method: 'DELETE',
    });
  }

  async post<
    ResponseBodyT = unknown,
    RequestQueryT = unknown,
    RequestBodyT = unknown,
  >(
    url: string,
    data: RequestBodyT,
    config?: HTTPRequestConfig<RequestQueryT, RequestBodyT>,
  ): Promise<HTTPResponse<ResponseBodyT>> {
    return this.request<ResponseBodyT, RequestQueryT, RequestBodyT>({
      ...config,
      url,
      data,
      method: 'POST',
    });
  }

  async put<
    ResponseBodyT = unknown,
    RequestQueryT = unknown,
    RequestBodyT = unknown,
  >(
    url: string,
    data: RequestBodyT,
    config?: HTTPRequestConfig<RequestQueryT, RequestBodyT>,
  ): Promise<HTTPResponse<ResponseBodyT>> {
    return this.request<ResponseBodyT, RequestQueryT, RequestBodyT>({
      ...config,
      url,
      data,
      method: 'PUT',
    });
  }

  async patch<
    ResponseBodyT = unknown,
    RequestQueryT = unknown,
    RequestBodyT = unknown,
  >(
    url: string,
    data: Partial<RequestBodyT>,
    config?: HTTPRequestConfig<RequestQueryT, RequestBodyT>,
  ): Promise<HTTPResponse<ResponseBodyT>> {
    return this.request<ResponseBodyT, RequestQueryT, Partial<RequestBodyT>>({
      ...config,
      url,
      data,
      method: 'PATCH',
    });
  }
}
