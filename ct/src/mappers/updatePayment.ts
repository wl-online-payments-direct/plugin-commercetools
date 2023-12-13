import { hasErrorDueConcurrentModification } from './common';
import { UpdatePaymentResponse } from '../types';

const updatePaymentResponseMapper = (response: UpdatePaymentResponse) => {
  const hasErrDueConcurrentModification =
    hasErrorDueConcurrentModification(response);

  const shouldThrowErrors =
    !!response?.body?.errors?.length && !hasErrDueConcurrentModification;

  if (shouldThrowErrors) {
    throw {
      message: '[CT] Failed to update payment',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  return {
    hasErrDueConcurrentModification,
    updatedOrder: response.body?.data?.updateOrder,
    updatedPayment: response.body?.data?.updatePayment,
  };
};

export { updatePaymentResponseMapper };
