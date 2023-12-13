import { CustomObjects, CustomObjectsResponse } from '../types';

const getCustomObjectsResponseMapper = (
  storeId: string,
  response: CustomObjectsResponse,
) => {
  if (response?.body?.errors) {
    throw {
      message: '[CT] Failed to retrieve custom object information',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  const parsedRes = response?.body?.data?.customObjects || {};

  const result = parsedRes?.results.find(
    (e: { container: string }) => e.container === storeId,
  );

  if (!result?.value) {
    throw {
      message: '[CT] Failed to fetch the custom object',
      statusCode: 500,
    };
  }

  const config = JSON.parse(JSON.stringify(result.value)) as CustomObjects;
  return config;
};

export { getCustomObjectsResponseMapper };
