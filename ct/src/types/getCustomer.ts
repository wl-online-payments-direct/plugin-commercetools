import { Customer, ErrorObject } from '@commercetools/platform-sdk';

export interface CustomerResponse {
  body: {
    data: {
      customers: {
        total: number;
        count: number;
        exists: boolean;
        results: Customer[];
      };
    };
    errors: ErrorObject[];
  };
}
