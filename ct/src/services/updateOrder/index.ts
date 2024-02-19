import { ApiClient } from '../../clients';
import { orderStatusQuery, orderPaymentStatusQuery } from './query';
import { updateOrderPaymentResponseMapper } from '../../mappers';
import { UpdateOrder } from '../../types';

export async function updateOrder(
  {
    id, // order id
    version, // order version
  }: {
    id: string;
    version: number;
  },
  orderState: string,
  paymentState?: string,
) {
  // Initialize api client
  const apiClient = new ApiClient();

  const variables: Record<string, any> = {
    id,
    version,
    orderState,
  };
  // Set paymentState variable only if it is provided
  if (paymentState) {
    variables.paymentState = paymentState;
  }
  // Choose the appropriate query based on the presence of paymentState
  const query = paymentState ? orderPaymentStatusQuery : orderStatusQuery;
  apiClient.setBody({
    query,
    variables,
  });

  const result = (await apiClient.execute()) as UpdateOrder;

  return updateOrderPaymentResponseMapper(result);
}
