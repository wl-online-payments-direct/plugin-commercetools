import { getMyCart, getCustomObjects } from '@worldline/ct-integration';
import { createPaymentService } from '@worldline/psp-integration';
import {
  createPaymentInDB,
  getIncrementedReference,
} from '@worldline/db-integration';
import { ICreatePaymentPayload, ICreatePaymentResponse } from './types';
import {
  getMappedResponse,
  getDatabasePayload,
  getConnectionServiceProps,
  getServicePayload,
} from './mappers';

export async function createPayment(
  payload: ICreatePaymentPayload,
): Promise<ICreatePaymentResponse> {
  // Fetch cart from Commercetools
  const myCart = await getMyCart(payload.authToken);
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);
  // Fetch incremented payment id
  const reference = await getIncrementedReference(payload.storeId);

  const payment = await createPaymentService(
    getConnectionServiceProps(customConfig),
    getServicePayload(customConfig, reference, myCart, payload),
  );

  // save payment information in the database
  await createPaymentInDB(
    getDatabasePayload(customConfig, reference, myCart, payload, payment),
  );

  return getMappedResponse(payment);
}
