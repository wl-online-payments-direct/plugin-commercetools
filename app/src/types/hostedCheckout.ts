export interface HostedCheckoutPayload {
  authToken: string;
  storeId: string;
  tokens: string;
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
