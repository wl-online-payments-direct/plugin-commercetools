import { GetCartResponse } from '../types';

const getCartResponseMapper = (response: GetCartResponse) => {
  const { cart } = response.body.data || {};
  return {
    cart,
  };
};

export { getCartResponseMapper };
