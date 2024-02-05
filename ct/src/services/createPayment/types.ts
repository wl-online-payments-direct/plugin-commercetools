import { Cart, ErrorObject } from '@commercetools/platform-sdk';

export interface ICart {
  body: { data: { cart: Cart }; errors: ErrorObject };
}
