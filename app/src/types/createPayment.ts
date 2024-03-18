export interface ICreateMyPaymentPayload {
  authToken: string;
  userAgent: string;
  acceptHeader: string;
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

export interface ICreatePaymentResponse {
  id: string;
  actionType: string;
  redirectURL: string;
}

export interface ICreatePaymentPayload {
  authToken: string;
  userAgent: string;
  acceptHeader: string;
  storeId: string;
  cartId: string;
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
