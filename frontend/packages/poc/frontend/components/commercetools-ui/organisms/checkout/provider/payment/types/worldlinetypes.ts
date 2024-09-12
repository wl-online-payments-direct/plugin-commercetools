import { PaymentMethod } from 'components/commercetools-ui/organisms/checkout/provider/payment/types';
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

export type ValidateResponse =
  | {
      statusCode?: number | undefined;
      result?: {
        hasInventory?: string | undefined;
      };
    }
  | null
  | undefined;

export interface WorldLinePaymentProvider {
  iframeLoaded: boolean;
  validateCart: () => Promise<ValidateResponse>;
  processPayment: () => void;
  fetchHostedTokenizationURL: (token?: string) => void;
  selectedPayment: PaymentMethod | undefined;
  setSelectedPayment: any;
}
