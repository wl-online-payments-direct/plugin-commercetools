import { Cart, ErrorObject } from '@commercetools/platform-sdk';

export interface CartById {
  body: {
    data: {
      cart: Cart;
    };
    errors: ErrorObject;
  };
}
