import { CustomObject, ErrorObject } from '@commercetools/platform-sdk';

export interface GetAllCustomObjectResponse {
  body: {
    data: {
      CustomObjectEntries: {
        total: number;
        count: number;
        exists: boolean;
        results: CustomObject[];
      };
    };
    errors: ErrorObject[];
  };
}

export enum Status {
  INITIAL = 'INITIAL',
  AUTHORIZED = 'AUTHORIZED',
}

export interface CaptureResponse {
  id?: number;
  status?: string;
}

export interface Payment {
  id: string;
  paymentId: string;
  worldlineId: string;
  storeId: string;
  cartId: string;
  orderId: string;
  storePermanently: boolean;
  errors: string | null;
  createdAt: Date;
  updatedAt: Date;
}
