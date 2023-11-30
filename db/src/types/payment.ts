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
  createdAt: Date;
  updatedAt: Date;
}
