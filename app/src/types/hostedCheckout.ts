export interface HostedCheckoutPayload {
  authToken: string;
  userAgent: string;
  acceptHeader: string;
  storeId: string;
  tokens: string;
  returnUrl: string;
}

export interface HostedCheckoutServicePayload {
  order: {
    amountOfMoney: {
      currencyCode: string;
      amount: number;
    };
    customer: {
      merchantCustomerId: string;
      billingAddress: {
        countryCode: string;
      };
    };
  };
  hostedCheckoutSpecificInput: {
    variant: string;
    locale?: string;
    tokens: string;
  };
}
