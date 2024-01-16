import { Cart, ErrorObject } from '@commercetools/platform-sdk';

export interface UpdateCart {
  body: {
    data: {
      updateCart: Cart;
    };
    errors: ErrorObject[];
  };
}
