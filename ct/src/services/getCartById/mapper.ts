const mapper = (response: any) => {
  if (response?.body?.errors) {
    throw {
      message: "[CT] Failed to retrieve cart information",
      details: response?.body?.errors,
      statusCode: 400,
    };
  }

  return response.body;
};

export default mapper;
