import { Payment } from '@commercetools/platform-sdk';
import { ApiClient } from '../../clients';
import query from './query';
import { createTransactionResponseMapper } from '../../mappers';
import { UpdatePayment } from '../../types';

export async function createTransaction(
  payment: Payment,
  centAmount: number,
  currencyCode: string,
  type: string,
) {
  const apiClient = new ApiClient();
  const { id, version } = payment;
  const currentTime = new Date();
  const variables = {
    id,
    version,
    amount: {
      currencyCode,
      centAmount,
    },
    time: currentTime.toISOString(),
    type,
  };
  apiClient.setBody({
    query,
    variables,
  });
  const result = (await apiClient.execute()) as UpdatePayment;

  return createTransactionResponseMapper(result);
}
