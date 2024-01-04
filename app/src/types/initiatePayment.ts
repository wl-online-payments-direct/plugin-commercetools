export interface InitializePaymentPayload {
  authToken: string;
  storeId: string;
  tokens: string;
  askConsumerConsent: boolean;
}

export interface InitServicePayload {
  variant: string;
  cart: {
    locale: string;
  };
  payload: {
    tokens: string[];
    askConsumerConsent: boolean;
  };
}
