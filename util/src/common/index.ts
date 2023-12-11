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
  // eslint-disable-next-line no-restricted-syntax
  for (const attribute in body) {
    if (!body[attribute]) {
      throw {
        message: `Required parameter '${attribute}' is missing or empty`,
        statusCode: 400,
      };
    }
  }
  // All checked out, request body is OK
  return true;
};

const hasRequiredParamsInQueryString = (queryString: {
  [key: string]: string | string[];
}) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const attribute in queryString) {
    if (!queryString[attribute]) {
      throw {
        message: `Required query string '${attribute}' is missing or empty`,
        statusCode: 400,
      };
    }
  }
  // All checked out, data is OK
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const retry = async (action: any, maxAttemptCount = 3) => {
  let retries = maxAttemptCount;
  while (retries > 0) {
    retries -= 1;
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
