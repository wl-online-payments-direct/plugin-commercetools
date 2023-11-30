import { getMyCart, getCustomObjects } from '@worldline/ct-integration';
import { createPaymentService } from '@worldline/psp-integration';
import {
  createPaymentInDB,
  getIncrementedPaymentId,
} from '@worldline/db-integration';
import { ICreatePaymentPayload } from './types';
import {
  getMappedResponse,
  getDatabasePayload,
  getConnectionServiceProps,
  getServicePayload,
} from './mappers';

export async function createPayment(payload: ICreatePaymentPayload) {
  // Fetch cart from Commercetools
  const activeCart = await getMyCart(payload.authToken);
  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(payload.storeId);
  // Fetch incremented payment id
  const { incrementedPaymentId } = await getIncrementedPaymentId();

  const payment = await createPaymentService(
    getConnectionServiceProps(customConfig),
    getServicePayload(customConfig, incrementedPaymentId, activeCart, payload),
  );

  // save payment information in the database
  await createPaymentInDB(
    getDatabasePayload(
      customConfig,
      incrementedPaymentId,
      activeCart,
      payload,
      payment,
    ),
  );

  return getMappedResponse(payment);
}
