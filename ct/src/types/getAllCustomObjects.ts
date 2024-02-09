import { CustomObject, ErrorObject } from '@commercetools/platform-sdk';

export interface GetAllCustomObjectResponse {
  body: {
    data: {
      customObjects: {
        count: number;
        results: CustomObject[];
      };
    };
    errors: ErrorObject[];
  };
}
