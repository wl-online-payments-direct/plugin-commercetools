import { MyCartResponse } from '../types';

const getMyCartResponseMapper = (response: MyCartResponse) => {
  const body = response?.body;
  if (
    body?.errors ||
    !body?.data?.me?.activeCart ||
    !body?.data?.me?.customer
  ) {
    throw {
      message:
        'Failed to fetch customer cart or No active cart has found for customer!',
      details: body?.errors,
      statusCode: 500,
    };
  }
  const { customer, activeCart: cart } = response.body.data.me;
  return {
    customer,
    cart,
  };
};

export { getMyCartResponseMapper };
