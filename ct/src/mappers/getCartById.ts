import { CartById } from '../types';

const getCartByIdResponseMapper = (response: CartById) => {
  if (response?.body?.errors) {
    throw {
      message: '[CT] Failed to retrieve cart information',
      details: response?.body?.errors,
      statusCode: 400,
    };
  }

  return response?.body?.data?.cart;
};

export { getCartByIdResponseMapper };
