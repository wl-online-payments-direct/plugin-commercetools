export interface CheckoutProps {
  label: string;
  logo: string;
  enabled: boolean;
  payButtonTitle?: string;
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
  redirectModeA_payOptionUpdate: {
    [key: string]: CheckoutProps;
  };
  redirectModeB: CheckoutProps;
  onSiteMode: CheckoutProps;
}

export interface PaymentMethod {
  name: string;
  type: string;
  image: { src: string };
  enabled: boolean;
  paymentMethod: string;
}
