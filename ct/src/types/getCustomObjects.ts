import { ErrorObject } from '@commercetools/platform-sdk';

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
  paymentMethods: [
    {
      title: string;
      redirectURL: string;
      type: string;
    },
  ];
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
      customObjects: {
        results: {
          container: string;
          key: string;
          value: CustomObjectsValue;
        }[];
      };
    };
    errors: ErrorObject[];
  };
}

export type CustomObjects = ConfigModes & ConnectionProps;
