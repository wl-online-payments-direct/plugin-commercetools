import { ErrorObject } from '@commercetools/platform-sdk';

export interface RedirectModeAPaymentOptions {
  sendOrderData: boolean;
  enabled: boolean;
  templateFileName: string;
  threeDSEnablement: boolean;
  threeDSChallenge: boolean;
  threeDSExemption: boolean;
  paymentOptions: {
    paymentProductId: number;
    displayOrder: number;
    label: string;
    enabled: boolean;
    logo: string;
  }[];
}

export interface RedirectModeBPaymentOptions {
  enabled: boolean;
  logo: string;
  payButtonTitle: string;
  templateFileName: string;
  groupCards?: boolean;
  threeDSEnablement: boolean;
  threeDSChallenge: boolean;
  threeDSExemption: boolean;
}

export interface OnSiteModePaymentOptions {
  enabled: boolean;
  logo: string;
  payButtonTitle: string;
  payButtonLanguage: string;
  templateFileName: string;
  threeDSEnablement: boolean;
  threeDSChallenge: boolean;
  threeDSExemption: boolean;
}

interface ConnectionProps {
  merchantId: string;
  integrator: string;
  apiKey: string;
  apiSecret: string;
  host: string;
  webhookKey: string;
  webhookSecret: string;
  webhookUrl: string;
  redirectUrl: string;
  enableWorldlineCheckout: boolean;
  redirectModeA: RedirectModeAPaymentOptions;
  redirectModeB: RedirectModeBPaymentOptions;
  onSiteMode: OnSiteModePaymentOptions;
}
interface ConfigModes {
  mode: string;
  skip3dsAuthentication: boolean;
  enableLogs: boolean;
  authorizationMode: string;
  variant: string;
  merchantReference: string;
}
interface ConnectionModes {
  live: ConnectionProps;
  test: ConnectionProps;
}

type CustomObjectsValue = ConfigModes & ConnectionModes;

export interface CustomObjectsResponse {
  body: {
    data: {
      customObject: {
        id: string;
        container: string;
        key: string;
        value: CustomObjectsValue;
      };
    };
    errors: ErrorObject[];
  };
}

export type CustomObjects = ConfigModes & ConnectionProps;
