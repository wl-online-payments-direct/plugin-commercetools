import { Order } from '@commercetools/platform-sdk';
import { CreateOrderPayload, CreateOrderResponse } from '../types';
import Constants from '../constants';

const { ORDER, CUSTOM_OBJECT } = Constants;

const getVariables = (payload: CreateOrderPayload) => {
  const { id, version, authorizationMode } = payload;
  const paymentState =
    authorizationMode === CUSTOM_OBJECT.AUTHORIZATION_MODE.SALE
      ? ORDER.PAYMENT_STATE.PAID
      : ORDER.PAYMENT_STATE.PENDING;

  return {
    id, // cart id
    version,
    paymentState,
  };
};

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

export { createOrderResponseMapper, getVariables };
