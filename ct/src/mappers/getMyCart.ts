import { MyCartResponse } from '../types';

const getMyCartResponseMapper = (response: MyCartResponse) => {
  const { customer, activeCart: cart } = response.body.data.me || {};
  return {
    customer,
    cart,
  };
};

export { getMyCartResponseMapper };
