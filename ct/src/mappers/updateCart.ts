import { UpdateCart } from '../types';

const updateCartResponseMapper = (response: UpdateCart) => {
  if (response?.body?.errors?.length) {
    throw {
      message: '[CT] Failed to update cart',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  return {
    updatedCart: response?.body?.data?.updateCart,
  };
};

export { updateCartResponseMapper };
