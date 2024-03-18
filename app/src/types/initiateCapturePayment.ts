export enum Status {
  INITIAL = 'INITIAL',
  AUTHORIZED = 'AUTHORIZED',
  IN_REVIEW = 'IN_REVIEW',
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
  status: string;
  storePermanently: boolean;
  errors: string | null;
  createdAt: Date;
  updatedAt: Date;
  isSendNotification?: boolean;
}

export interface CustomObject {
  id: string;
  version: number;
  createdAt: string;
  container: string;
  key: string;
  value: {
    captureAuthorizationMode: string;
    serverConfig: {
      url: string;
      port: string;
      username: string;
      password: string;
      to: string;
      from: string;
    };
  };
}
