import { $Enums } from '@prisma/client';

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
  status: $Enums.Status;
  storePermanently: boolean;
  errors: string | null;
  createdAt: Date;
  updatedAt: Date;
  isSendNotification?: boolean;
}
