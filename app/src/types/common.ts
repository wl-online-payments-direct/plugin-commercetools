export interface RedirectModeA {
  [key: string]: { label: string; logo: string; enabled: boolean };
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
  redirectModeA_payOptionUpdate: RedirectModeA;
}

export interface MappedRedirectModeA {
  name: string;
  type: string;
  image: { src: string };
  enabled: boolean;
  paymentMethod: string;
}
