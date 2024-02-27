export interface RedirectModeAPaymentOptions {
  sendOrderData: boolean;
  enabled: boolean;
  paymentOptions: {
    paymentProductId: number;
    displayOrder: number;
    label: string;
    enabled: boolean;
    logo: string;
    recurrenceType?: string;
    signatureType?: string;
    paymentOption?: string;
  }[];
}

export interface RedirectModeBPaymentOptions {
  enabled: boolean;
  logo: string;
  payButtonTitle: string;
  templateFileName: string;
  groupCards?: boolean;
}

export interface OnSiteModePaymentOptions {
  enabled: boolean;
  logo: string;
  payButtonTitle: string;
  payButtonLanguage: string;
  templateFileName: string;
}

export interface CustomObjects {
  mode: string;
  authorizationMode: string;
  skip3dsAuthentication: boolean;
  merchantId: string;
  integrator: string;
  apiKey: string;
  apiSecret: string;
  host: string;
  variant: string;
  merchantReference: string;
  webhookKey: string;
  webhookSecret: string;
  webhookUrl: string;
  redirectUrl: string;
  enableWorldlineCheckout: boolean;
  redirectModeA: RedirectModeAPaymentOptions;
  redirectModeB: RedirectModeBPaymentOptions;
  onSiteMode: OnSiteModePaymentOptions;
}

export interface PaymentMethod {
  paymentProductId?: number;
  name: string;
  type: string;
  displayOrder?: number;
  image: { src: string };
  enabled: boolean;
  paymentMethod: string;
}
