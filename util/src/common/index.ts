import { Action, Request } from '../types';

const hasAuthHeaderOrThrowError = (request: Request) => {
  if (!request.headers.authorization) {
    throw {
      message: 'Authentication request failed because of invalid token',
      statusCode: 403,
    };
  }
};

const hasRequiredParamsInBody = (body: { [key: string]: string | number }) => {
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

const retry = async (action: Action, maxAttemptCount = 3) => {
  let retries = maxAttemptCount;
  while (retries > 0) {
    retries -= 1;
    // TODO: will fix this
    // eslint-disable-next-line no-await-in-loop
    const { isRetry, data = {} } = await action();
    if (!isRetry) {
      return data;
    }
  }
  // If max retries attempted; throw error
  if (!retries) {
    throw {
      statusCode: 500,
      message: 'Failed to fetch the resource. Max retry attempt failed',
    };
  }
  return null;
};

export {
  hasAuthHeaderOrThrowError,
  hasRequiredParamsInBody,
  hasRequiredParamsInQueryString,
  retry,
};
