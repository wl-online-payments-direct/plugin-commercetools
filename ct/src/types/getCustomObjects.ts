import { ErrorObject } from '@commercetools/platform-sdk';

interface RedirectModeA {
  [key: string]: { label: string; logo: string; enabled: boolean };
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
  redirectModeA_payOptionUpdate: RedirectModeA;
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
