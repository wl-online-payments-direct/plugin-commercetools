const mapper = (response: any) => {
  if (response?.body?.errors) {
    throw {
      message: "[CT] Failed to retrieve cart information",
      details: response?.body?.errors,
      statusCode: 400,
    };
  }

  const { customer, activeCart: cart } = response?.body?.data?.me || {};

  return {
    customer,
    cart,
  };
};

export default mapper;
