export interface RedirectModeAPaymentOptions {
  sendOrderData: boolean;
  templateFileName: string;
  enabled: boolean;
  '3dsEnablement': boolean;
  '3dsChallenge': boolean;
  '3dsExemption': boolean;
  paymentOptions: {
    paymentMethod: string;
    paymentProductId: number;
    paymentMethodType: string;
    displayOrder: number;
    label: string;
    enabled: boolean;
    logo: string;
    defaultLogo: string;
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
  '3dsEnablement': boolean;
  '3dsChallenge': boolean;
  '3dsExemption': boolean;
}

export interface OnSiteModePaymentOptions {
  enabled: boolean;
  logo: string;
  payButtonTitle: string;
  payButtonLanguage: string;
  templateFileName: string;
  '3dsEnablement': boolean;
  '3dsChallenge': boolean;
  '3dsExemption': boolean;
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
  timeOut: number;
  enableWorldlineCheckout: boolean;
  redirectModeA: RedirectModeAPaymentOptions;
  redirectModeB: RedirectModeBPaymentOptions;
  onSiteMode: OnSiteModePaymentOptions;
}

export interface PaymentMethod {
  paymentProductId?: number;
  paymentMethodType?: string;
  name: string;
  type: string;
  displayOrder?: number;
  image: { src: string };
  enabled: boolean;
  paymentMethod: string;
}
