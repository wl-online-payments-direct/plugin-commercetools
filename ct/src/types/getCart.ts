import { Cart, ErrorObject } from '@commercetools/platform-sdk';

export interface GetCartResponse {
  body: {
    data: {
      cart: Cart;
    };
    errors: ErrorObject;
  };
}
