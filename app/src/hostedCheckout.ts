import {
  getCart,
  getCustomObjects,
  getMyCart,
} from '@worldline/ctintegration-ct';
import { hostedCheckoutService } from '@worldline/ctintegration-psp';
import {
  createPaymentInDB,
  getIncrementedReference,
} from '@worldline/ctintegration-db';
import { HostedCheckoutPayload, HostedMyCheckoutPayload } from './types';
import {
  getHostedCheckoutPayload,
  getConnectionServiceProps,
  getDatabasePayload,
} from './mappers';

export async function hostedMyCheckoutSession(
  payload: HostedMyCheckoutPayload,
) {
  // Fetch customer cart from Commercetools
  const { cart } = await getMyCart(payload.authToken);
  if (!cart) {
    throw {
      message: 'Failed to fetch the cart of cart is missing',
      statusCode: 500,
    };
  }
  const customConfig = await getCustomObjects(payload.storeId);

  // Fetch incremented payment id
  const reference = await getIncrementedReference(payload.storeId);

  const result = await hostedCheckoutService(
    getConnectionServiceProps(customConfig),
    getHostedCheckoutPayload(customConfig, reference, cart, payload),
  );

  // save payment information in the database
  await createPaymentInDB(
    getDatabasePayload(customConfig, reference, cart, payload),
  );

  return result;
}

export async function hostedCheckoutSession(payload: HostedCheckoutPayload) {
  // Fetch customer cart from Commercetools
  const { cart } = await getCart(payload.cartId, payload.authToken);
  if (!cart) {
    throw {
      message: 'Failed to fetch the cart of cart is missing',
      statusCode: 500,
    };
  }
  const customConfig = await getCustomObjects(payload.storeId);

  // Fetch incremented payment id
  const reference = await getIncrementedReference(payload.storeId);

  const result = await hostedCheckoutService(
    getConnectionServiceProps(customConfig),
    getHostedCheckoutPayload(customConfig, reference, cart, payload),
  );

  // save payment information in the database
  await createPaymentInDB(
    getDatabasePayload(customConfig, reference, cart, payload),
  );

  return result;
}
