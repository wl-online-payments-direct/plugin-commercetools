import { getCustomObjects, getCart } from '@worldline/ctintegration-ct';
import { hostedTokenizationService } from '@worldline/ctintegration-psp';
import { HostedTokenizationPayload } from './types';
import {
  getTokenizationServicePayload,
  getConnectionServiceProps,
} from './mappers';

export async function hostedTokenizationSession(
  payload: HostedTokenizationPayload,
) {
  // Fetch customer cart from Commercetools
  const { cart } = await getCart(payload.cartId, payload.authToken);
  if (!cart) {
    throw {
      message: 'Failed to fetch the cart of cart is missing',
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
