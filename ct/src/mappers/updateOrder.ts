import { UpdateOrder } from '../types';

const updateOrderPaymentResponseMapper = (response: UpdateOrder) => {
  if (response?.body?.errors) {
    throw {
      message: '[CT] Failed to update order',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  return {
    updatedOrder: response.body?.data?.updateOrder,
  };
};

export { updateOrderPaymentResponseMapper };
