import { HTTPResponse } from '@/types';

export interface HTTPErrorProps<ResponseBodyT = unknown> {
  message: string;
  response?: HTTPResponse<ResponseBodyT>;
}

export class HTTPError<ResponseBodyT = unknown> extends Error {
  response?: HTTPResponse<ResponseBodyT>;

  stacks?: string;

  constructor({ message, response }: HTTPErrorProps<ResponseBodyT>) {
    super(message);

    this.response = response;

    Error.captureStackTrace(this, this.constructor);

    this.stacks = this.stack;
  }
}
