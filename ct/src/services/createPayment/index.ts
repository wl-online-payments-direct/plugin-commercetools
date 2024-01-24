import { ApiClient } from '../../clients';
import query from './query';
import { createPaymentResponseMapper } from '../../mappers';
import { CreatePaymentResponse, PaymentPayload } from '../../types';
import Constants from '../../constants';

export async function createPayment(payload: PaymentPayload) {
  const {
    payment: {
      id: interfaceId,
      paymentOutput: {
        paymentMethod,
        amountOfMoney: { amount: centAmount, currencyCode },
        references: { merchantReference },
      },
    },
  } = payload;

  const apiClient = new ApiClient();
  const variables = {
    draft: {
      amountPlanned: {
        currencyCode,
        centAmount,
      },
      interfaceId,
      paymentMethodInfo: {
        method: paymentMethod,
        name: {
          locale: 'en',
          value: paymentMethod,
        },
      },
      custom: {
        typeKey: Constants.CREATE_PAYMENT.TYPE_KEY,
        fields: [
          {
            name: Constants.CREATE_PAYMENT.FIELDS.PAYMENTID,
            value: `"${merchantReference}"`,
          },
        ],
      },
    },
  };

  apiClient.setBody({
    query,
    variables,
  });

  const response = (await apiClient.execute()) as CreatePaymentResponse;

  const mappedResult = createPaymentResponseMapper(response);

  if (!mappedResult) {
    throw {
      message: 'Failed to create the payment using order',
      statusCode: 500,
    };
  }

  return mappedResult;
}
