export interface HostedCheckoutPayload {
  order: {
    amountOfMoney: {
      currencyCode: string;
      amount: number;
    };
    customer: {
      merchantCustomerId: string;
      billingAddress: {
        countryCode: string;
        houseNumber?: string;
        city: string;
        state: string;
        street: string;
        zip: string;
        additionalInfo: string;
      };
    };
  };
  hostedCheckoutSpecificInput: {
    variant: string;
    locale?: string;
    tokens: string;
  };
}

export interface HostedCheckoutServiceResponse {
  RETURNMAC: string;
  hostedCheckoutId: string;
  merchantReference: string;
  redirectUrl: string;
  partialRedirectUrl: string;
}

export interface HostedCheckoutResponse {
  hostedCheckoutId: string;
  redirectUrl: string;
}
