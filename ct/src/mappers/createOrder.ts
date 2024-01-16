import { Order } from '@commercetools/platform-sdk';
import { CreateOrderResponse } from '../types';

const createOrderResponseMapper = (response: CreateOrderResponse): Order => {
  if (response?.body?.errors || !response.body?.data?.createOrderFromCart) {
    throw {
      message: '[CT] Failed to create order',
      statusCode: 500,
      details: response?.body?.errors,
    };
  }

  return response.body?.data?.createOrderFromCart;
};

export { createOrderResponseMapper };
