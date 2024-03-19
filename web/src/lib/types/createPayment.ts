export interface CreatePaymentPayload {
  cartId: string;
  storeId: string;
  hostedTokenizationId: string;
  returnUrl: string;
  device: {
    timezoneOffsetUtcMinutes: number;
    browserData: {
      colorDepth: number;
      javaEnabled: boolean;
      screenHeight: number;
      screenWidth: number;
    };
  };
}
