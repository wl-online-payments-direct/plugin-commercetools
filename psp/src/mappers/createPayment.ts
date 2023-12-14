import { CreatedPaymentServiceResponse } from '../types';

export async function getCreatePaymentMappedResponse(
  result: CreatedPaymentServiceResponse,
) {
  const {
    payment: { id = '' },
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
  };
}
