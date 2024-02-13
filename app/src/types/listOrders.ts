export interface ListOrdersPayload {
  storeId: string;
  orderId?: string;
  page?: number;
  limit?: number;
  filterOption?: string;
}
