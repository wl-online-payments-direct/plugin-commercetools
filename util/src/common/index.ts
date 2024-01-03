import { Request } from '../types';

const hasAuthHeaderOrThrowError = (request: Request) => {
  if (!request.headers.authorization) {
    throw {
      message: 'Authentication request failed because of invalid token',
      statusCode: 403,
    };
  }
};

const hasRequiredParamsInBody = (body: { [key: string]: string }) => {
  Object.keys(body).forEach((key) => {
    if (!body[key]) {
      throw {
        message: `Required parameter '${key}' is missing or empty`,
        statusCode: 400,
      };
    }
  });
  // All checked out, request body is OK
  return true;
};

const hasRequiredParamsInQueryString = (queryString: {
  [key: string]: string | string[];
}) => {
  Object.keys(queryString).forEach((key) => {
    if (!queryString[key]) {
      throw {
        message: `Required query string '${key}' is missing or empty`,
        statusCode: 400,
      };
    }
  });
  // All checked out, data is OK
  return true;
};

export {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
  hasRequiredParamsInQueryString,
};
