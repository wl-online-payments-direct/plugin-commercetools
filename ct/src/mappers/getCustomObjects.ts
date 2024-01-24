import { CustomObjects, CustomObjectsResponse } from '../types';

const getCustomObjectsResponseMapper = (response: CustomObjectsResponse) => {
  if (response?.body?.errors) {
    throw {
      message: '[CT] Failed to retrieve custom object information',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  const result = response?.body?.data?.customObject || {};

  if (!result?.value) {
    throw {
      message: '[CT] Failed to fetch the custom object',
      statusCode: 500,
    };
  }

  const { mode, live, test, ...rest } = result.value;
  const connectionProps = mode === 'live' ? live : test;
  const config = {
    mode,
    ...connectionProps,
    ...rest,
  } as CustomObjects;

  return config;
};

export { getCustomObjectsResponseMapper };
