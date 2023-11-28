import { Request } from '../types';

const hasAuthHeaderOrThrowError = (request: Request) => {
  if (!request.headers.authorization) {
    throw {
      message: 'Authentication request failed because of invalid token',
      statusCode: 403,
    };
  }
};

const hasRequiredParamsInBody = (request: Request, rules: string[]) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const attribute of rules) {
    if (!request.body[attribute]) {
      throw {
        message: `Required parameter '${attribute}' is missing or empty`,
        statusCode: 400,
      };
    }
  }
  // All checked out, request body is OK
  return true;
};

const hasRequiredParamsInQueryString = (
  data: {
    [key: string]: string | string[];
  },
  rules: string[],
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const attribute of rules) {
    if (!data[attribute]) {
      throw {
        message: `Required query string '${attribute}' is missing or empty`,
        statusCode: 400,
      };
    }
  }
  // All checked out, data is OK
  return true;
};

export {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
  hasRequiredParamsInQueryString,
};
