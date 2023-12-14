import { ErrorObject } from '@commercetools/platform-sdk';

interface ConnectionProps {
  skip3dsAuthentication: boolean;
  merchantId: string;
  integrator: string;
  apiKey: string;
  apiSecret: string;
  host: string;
  enablePspLogs: boolean;
}
interface ConfigModes {
  mode: string;
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
    errors: ErrorObject;
  };
}

export type CustomObjects = ConfigModes & ConnectionProps;
