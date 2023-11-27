const mapper = (storeId: string, response: any) => {
  if (response?.body?.errors) {
    throw {
      message: '[CT] Failed to retrieve custom object information',
      details: response?.body?.errors,
      statusCode: 400,
    };
  }

  const parsedRes = response?.body?.data?.customObjects || {};

  const result = parsedRes?.results.find(
    (e: { container: string }) => e.container === storeId,
  );

  if (!result) {
    throw {
      message: '[CT] Failed to fetch the custom object',
      statusCode: 400,
    };
  }

  const config = result ? JSON.parse(JSON.stringify(result.value)) : null;
  return config;
};

export default mapper;
