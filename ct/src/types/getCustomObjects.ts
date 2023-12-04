import { ErrorObject } from '@commercetools/platform-sdk';

export interface CustomObjects {
  authorizationMode: string;
  merchantId: string;
  integrator: string;
  apiKey: string;
  apiSecret: string;
  host: string;
  enablePspLogs: boolean;
  variant: string;
  merchantReference: string;
}

export interface CustomObjectsResponse {
  body: {
    data: {
      customObjects: {
        results: {
          container: string;
          key: string;
          value: CustomObjects;
        }[];
      };
    };
    errors: ErrorObject;
  };
}
