import { getCustomObjects, getMyCart } from '@worldline/ctintegration-ct';
import { hostedCheckoutService } from '@worldline/ctintegration-psp';
import { getIncrementedReference } from '@worldline/ctintegration-db';
import { HostedCheckoutPayload } from './types';
import { getHostedCheckoutPayload, getConnectionServiceProps } from './mappers';

export async function hostedCheckoutSession(payload: HostedCheckoutPayload) {
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

  return result;
}
