import { CustomObject, ErrorObject } from '@commercetools/platform-sdk';

export interface CustomObjectResponse {
  body: {
    data: {
      customObject: CustomObject;
    };
    errors: ErrorObject[];
  };
}
