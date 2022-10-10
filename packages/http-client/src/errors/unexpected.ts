import { HTTPError } from '@/errors/http-error';

export class UnexpectedHTTPError extends HTTPError {
  constructor() {
    super({
      message: 'Something went very wrong!',
      response: { data: undefined, status: 500 },
    });
  }
}
