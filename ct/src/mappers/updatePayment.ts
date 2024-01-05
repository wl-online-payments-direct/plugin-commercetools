import { UpdatePaymentResponse } from '../types';

const updatePaymentResponseMapper = (response: UpdatePaymentResponse) => {
  if (response?.body?.errors?.length) {
    throw {
      message: '[CT] Failed to update payment',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  return {
    updatedOrder: response.body?.data?.updateOrder,
    updatedPayment: response.body?.data?.updatePayment,
  };
};

export { updatePaymentResponseMapper };
