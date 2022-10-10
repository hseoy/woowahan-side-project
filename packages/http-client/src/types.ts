export interface HTTPResponse<ResponseBodyT = unknown> {
  data: ResponseBodyT;
  status: number;
}

export type HTTPMethod = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export type HTTPHeaderValue = string | string[] | number | boolean | null;
export type RequestHeaders = Record<string, HTTPHeaderValue>;

export interface HTTPRequestConfig<RequestBodyT = unknown> {
  url?: string;
  baseURL?: string;
  method?: HTTPMethod;
  data?: RequestBodyT;
  headers?: RequestHeaders;
}
