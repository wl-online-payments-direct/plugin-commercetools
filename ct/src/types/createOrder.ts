import { ErrorObject, Order } from '@commercetools/platform-sdk';

export interface CreateOrderPayload {
  id: string;
  version: number;
  accessToken: string;
}

export interface CreateOrderResponse {
  body: {
    data: {
      createOrderFromCart: Order;
    };
    errors: ErrorObject;
  };
}
