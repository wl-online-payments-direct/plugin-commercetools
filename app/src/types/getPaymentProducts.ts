export interface GetPaymentProductsPayload {
  storeId: string;
  countryCode: string;
  currencyCode: string;
}

export interface GetPaymentProductsResponse {
  paymentProducts: [
    {
      displayHints: {
        displayOrder: number;
        label: string;
        logo: string;
      };
    },
  ];
}
