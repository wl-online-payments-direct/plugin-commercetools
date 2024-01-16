import { Payment } from '@commercetools/platform-sdk';
import { CreatePaymentResponse } from '../types';

const createPaymentResponseMapper = (
  response: CreatePaymentResponse,
): Payment => {
  if (response?.body?.errors || !response.body?.data?.createPayment) {
    throw {
      message: '[CT] Failed to create payment',
      statusCode: 500,
      details: response?.body?.errors,
    };
  }

  return response.body?.data?.createPayment;
};

export { createPaymentResponseMapper };
