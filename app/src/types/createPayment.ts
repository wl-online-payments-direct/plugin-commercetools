import { $Enums } from '@worldline/ctintegration-db';

export interface IPayload {
  authToken: string;
  storeId: string;
  hostedTokenizationId: string;
  returnUrl: string;
}

export interface ServicePayload {
  authorizationMode: string;
  cart: {
    id: string;
    customerId: string;
    taxedPrice: {
      totalGross: { centAmount: number; currencyCode: string };
    };
  };
  customer: { id: string };
  paymentId: string;
  payload: {
    hostedTokenizationId: string;
    returnUrl: string;
  };
}

export interface DatabasePayload {
  authorizationMode: $Enums.Modes;
  cart: {
    id: string;
  };
  paymentId: string;
  storeId: string;
  payment: {
    id: number;
  };
}

export interface Response {
  id: number;
  redirectURL: string;
}
