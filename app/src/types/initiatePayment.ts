export interface InitializePaymentPayload {
  authToken: string;
  storeId: string;
  tokens: string;
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
