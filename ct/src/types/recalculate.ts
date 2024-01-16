import { Cart, ErrorObject } from '@commercetools/platform-sdk';

export interface RecalculateCartResponse {
  body: {
    data: {
      updateCart: Cart;
    };
    errors: ErrorObject[];
  };
}
