export interface WLCreatePaymentData {
  storeId?: string | null;
  hostedTokenizationId: string;
  returnUrl: string;
}

export type WLPaymentData = {
  name: string;
  type: string;
  image: {
    src: string;
  };
  paymentMethod: string;
};

export type ValidateCartResponse = {
  isError: boolean;
  data?: {
    statusCode?: number;
  };
};

export interface WorldLinePaymentProvider {
  iframeLoaded: boolean;
  validateCart: () => Promise<{ statusCode?: number | undefined } | null | undefined>;
  processPayment: () => void;
  fetchHostedTokenizationURL: () => void;
}
