import { Cart, Customer, ErrorObject } from '@commercetools/platform-sdk';

export interface MyCartResponse {
  body: {
    data: {
      me: {
        activeCart: Cart;
        customer: Customer;
      };
    };
    errors: ErrorObject;
  };
}
