import { Order, ErrorObject } from '@commercetools/platform-sdk';

export interface OrderById {
  body: {
    data: {
      order: Order;
    };
    errors: ErrorObject;
  };
}
