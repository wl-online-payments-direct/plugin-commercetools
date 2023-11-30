import { ICart } from './types';

const mapper = (response: ICart) => {
  const body = response?.body;
  if (
    body?.errors ||
    !body?.data?.me?.activeCart ||
    !body?.data?.me?.customer
  ) {
    throw {
      message: 'Failed to fetch customer cart!',
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

export default mapper;
