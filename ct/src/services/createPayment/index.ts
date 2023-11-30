// import { Order } from '@commercetools/platform-sdk';
import { ApiClient } from '../../clients';
import query from './query';
import mapper from './mapper';

export async function createPayment(order: any) {
  // Initialize api client
  const apiClient = new ApiClient();

  const {
    id,
    method,
    taxedPrice: {
      totalGross: { centAmount, currencyCode },
    },
  } = order;
  const variables = {
    draft: {
      amountPlanned: {
        currencyCode,
        centAmount,
      },
      paymentMethodInfo: {
        method,
      },
    },
  };

  apiClient.setBody({
    query,
    variables,
  });

  const response = await apiClient.execute();

  const mappedResult = mapper(response);

  if (!mappedResult) {
    throw {
      message: `Failed to create the payment using order ${id}`,
      statusCode: 500,
    };
  }

  return mappedResult;
}
