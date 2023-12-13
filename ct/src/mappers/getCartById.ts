import { CartById } from '../types';

const getCartByIdResponseMapper = (response: CartById) =>
  response?.body?.data?.cart;

export { getCartByIdResponseMapper };
