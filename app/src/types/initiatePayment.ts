export interface InitPaymentPayload {
  authToken: string;
  storeId: string;
  cartId: string;
  tokens: string[];
  askConsumerConsent: boolean;
}

export interface InitServicePayload {
  variant: string;
  locale: any;
  payload: {
    tokens: string[];
    askConsumerConsent: boolean;
  };
}
