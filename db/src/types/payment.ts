import { $Enums } from '@prisma/client';

export interface Payment {
  id: string;
  paymentId: string;
  worldlineId: string;
  storeId: string;
  cartId: string;
  orderId: string;
  status: $Enums.Status;
  state: $Enums.States;
  storePermanently: boolean;
  errors: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface PaymentQueryParams {
  orderId: string;
  page: number;
}

export interface PaymentReference {
  id: string;
  storeId: string;
  version: number;
  referenceId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentRequest {
  authMode: $Enums.Modes;
  paymentId: string;
  worldlineId: string;
  storeId: string;
  cartId: string;
  orderId: string;
  status?: $Enums.Status;
  state?: $Enums.States;
}

export interface CreatePaymentResponse {
  id: string;
  paymentId: string;
  worldlineId: string;
  orderId: string;
  status: $Enums.Status;
  state: $Enums.States;
}

export interface CapturePaymentRequest {
  storeId: string;
  orderId: string;
  paymentId: string;
  worldlineId: string;
  amount: number;
  type?: string | null;
  status?: string | null;
  errors?: string | null;
}

export interface CapturePaymentResponse {
  id: string;
  storeId: string;
  orderId: string;
  paymentId: string;
  worldlineId: string;
  amount: number;
  type: string | null;
  status: string | null;
  errors: string | null;
}
export interface GetOrders {
  meta: {
    orderId: string;
    page: number;
    totalCount: number;
  };
  data: Payment[];
}
