import { getMyCart, getCustomObjects } from '@worldline/ct-integration';
import { createPaymentService } from '@worldline/psp-integration';
import {
  createPaymentInDB,
  getIncrementedPaymentId,
} from '@worldline/db-integration';
import { IPayload } from './types';
import {
  getMappedResponse,
  getDatabasePayload,
  getConnectionServiceProps,
  getServicePayload,
} from './mappers';

export async function createPayment(payload: IPayload) {
  const { authToken, storeId } = payload;

  // Fetch cart from Commercetools
  const { cart, customer } = await getMyCart(authToken);

  if (!cart) {
    throw { message: 'Failed to fetch the cart data', statusCode: 400 };
  }

  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(authToken, storeId);

  const { incrementedPaymentId } = await getIncrementedPaymentId();
  // Concat with the merchant reference
  const paymentId = `${customConfig.merchantReference}-${incrementedPaymentId}`;

  const { authorizationMode } = customConfig;

  const payment = await createPaymentService(
    getConnectionServiceProps(customConfig),
    getServicePayload({
      authorizationMode,
      cart,
      paymentId,
      customer,
      payload,
    }),
  );

  // save payment information in the database
  await createPaymentInDB(
    getDatabasePayload({
      authorizationMode,
      cart,
      paymentId,
      storeId,
      payment,
    }),
  );

  return getMappedResponse(payment);
}
