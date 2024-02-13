import { CreatedPaymentServiceResponse } from '../types';

export async function getCreatePaymentMappedResponse(
  result: CreatedPaymentServiceResponse,
) {
  const {
    payment: {
      id = '',
      paymentOutput: {
        amountOfMoney: { amount = 0, currencyCode = '' },
      },
      status = '',
      statusOutput: { statusCode = 0 },
    },
    merchantAction = {
      actionType: '',
      redirectData: {
        redirectURL: '',
      },
    },
  } = result.body || {};

  return {
    id: id.toString(),
    actionType: merchantAction.actionType,
    redirectURL: merchantAction.redirectData.redirectURL,
    amount,
    currencyCode,
    status,
    statusCode,
  };
}
