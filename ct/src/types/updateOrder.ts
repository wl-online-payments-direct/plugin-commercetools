import { ErrorObject, Order } from '@commercetools/platform-sdk';

export interface UpdateOrder {
  body: {
    data: {
      updateOrder: Order;
    };
    errors: ErrorObject[];
  };
}
