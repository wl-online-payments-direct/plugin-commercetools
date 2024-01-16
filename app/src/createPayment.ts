import { getMyCart, getCustomObjects } from '@worldline/ctintegration-ct';
import { createPaymentService } from '@worldline/ctintegration-psp';
import {
  createPaymentInDB,
  getIncrementedReference,
} from '@worldline/ctintegration-db';
import { ICreatePaymentPayload, ICreatePaymentResponse } from './types';
import {
  getDatabasePayload,
  getConnectionServiceProps,
  getServicePayload,
  getCreatedPaymentMappedResponse,
} from './mappers';

export async function createPayment(
  payload: ICreatePaymentPayload,
): Promise<ICreatePaymentResponse> {
  // Fetch cart from Commercetools
  const { cart } = await getMyCart(payload.authToken);
  if (!cart) {
    throw {
      message: 'Failed to fetch the cart or cart is empty!',
      statusCode: 500,
    };
  }
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);
  // Fetch incremented payment id
  const reference = await getIncrementedReference(payload.storeId);

  const payment = await createPaymentService(
    getConnectionServiceProps(customConfig),
    getServicePayload(customConfig, reference, cart, payload),
  );

  // save payment information in the database
  const dbPayment = await createPaymentInDB(
    getDatabasePayload(customConfig, reference, cart, payload, payment),
  );

  return getCreatedPaymentMappedResponse(payment, dbPayment);
}
