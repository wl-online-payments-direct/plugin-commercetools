import { OrderById } from '../types';

const getOrderByIdResponseMapper = (response: OrderById) =>
  response?.body?.data?.order;

export { getOrderByIdResponseMapper };
