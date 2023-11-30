import { Cart, Customer, ErrorObject } from '@commercetools/platform-sdk';

export interface ICart {
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
