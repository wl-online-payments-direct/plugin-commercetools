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
  cardPaymentMethodSpecificInput: {
    paymentProductId?: number;
    authorizationMode?: string;
  };
  hostedCheckoutSpecificInput?: {
    variant?: string;
    locale?: string;
    tokens?: string;
    returnUrl?: string;
    paymentProductFilters?: {
      restrictTo: {
        products: [];
      };
    };
    cardPaymentMethodSpecificInput?: {
      groupCards: boolean;
    };
  };
  redirectPaymentMethodSpecificInput?: {
    paymentProductId?: number;
    returnUrl?: string;
    redirectionData?: {
      returnUrl?: string;
    };
    requiresApproval?: boolean;
  };
  mobilePaymentMethodSpecificInput?: {
    paymentProductId?: number;
    authorizationMode?: string;
  };
  sepaDirectDebitPaymentMethodSpecificInput: {
    paymentProduct771SpecificInput?: {
      mandate?: {
        returnUrl?: string;
        customerReference: string;
        recurrenceType: string;
        signatureType: string;
      };
    };
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
