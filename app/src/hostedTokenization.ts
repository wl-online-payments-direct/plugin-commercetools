import { getCustomObjects, getCart } from '@worldline/ctintegration-ct';
import { hostedTokenizationService } from '@worldline/ctintegration-psp';
import { HostedTokenizationPayload } from './types';
import {
  getTokenizationServicePayload,
  getConnectionServiceProps,
  isCartActive,
} from './mappers';

export async function hostedTokenizationSession(
  payload: HostedTokenizationPayload,
) {
  // Fetch customer cart from Commercetools
  const { cart } = await getCart(payload.cartId, payload.authToken);
  if (!cart || !isCartActive(cart)) {
    throw {
      message: 'Failed to fetch the cart or cart is not active',
      statusCode: 500,
    };
  }

  const customConfig = await getCustomObjects(payload.storeId);

  const result = await hostedTokenizationService(
    getConnectionServiceProps(customConfig),
    getTokenizationServicePayload(customConfig, cart, payload),
  );

  return result;
}
