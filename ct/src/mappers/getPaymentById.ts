import { PaymentById } from '../types';

const getPaymentByIdResponseMapper = (response: PaymentById) =>
  response?.body?.data?.payment;

export { getPaymentByIdResponseMapper };
