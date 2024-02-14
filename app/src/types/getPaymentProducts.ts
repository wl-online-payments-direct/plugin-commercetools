export interface GetPaymentProductsPayload {
  storeId: string;
  countryCode: string;
  currencyCode: string;
}

export interface GetPaymentProductsResponse {
  paymentProducts: [
    {
      id: number;
      paymentMethod: string;
      paymentProductGroup: string;
      displayHints: {
        displayOrder: number;
        label: string;
        logo: string;
      };
    },
  ];
}
