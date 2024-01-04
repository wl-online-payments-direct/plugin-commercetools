import { Request } from '../types';
import type { QueryParams } from '../types';

export function getQuery(request: Request): QueryParams {
  if (!request.url) {
    throw {
      message: 'Exception occured while fetching the query parameter',
      statusCode: 500,
    };
  }
  const url = new URL(request.url, `https://${request.headers.host}`);
  return Object.fromEntries(url.searchParams.entries());
}

export function pick<Data extends object, Keys extends keyof Data>(
  data: Data,
  keys: Keys[],
): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>;

  keys.forEach((key) => {
    result[key] = data[key];
  });

  return result;
}
