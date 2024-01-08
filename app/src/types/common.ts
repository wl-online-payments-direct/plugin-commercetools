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
  paymentMethods: [
    {
      title: string;
      redirectURL: string;
      type: string;
    },
  ];
}
