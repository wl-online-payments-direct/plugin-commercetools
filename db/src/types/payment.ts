import { $Enums } from "@prisma/client";

export interface CreatePaymentType {
  id: string;
  paymentId: string;
  worldlineId: string;
  storeId: string;
  cartId: string;
  orderId: string;
  status: $Enums.Status;
  state: $Enums.States;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentRequest {
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
  status: $Enums.Status;
  state: $Enums.States;
}
