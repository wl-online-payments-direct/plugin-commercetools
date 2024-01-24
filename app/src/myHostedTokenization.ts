import { getCustomObjects, getMyCart } from '@worldline/ctintegration-ct';
import { hostedTokenizationService } from '@worldline/ctintegration-psp';
import { MyHostedTokenizationPayload } from './types';
import {
  getMyHostedTokenizationServicePayload,
  getConnectionServiceProps,
} from './mappers';

export async function myHostedTokenizationSession(
  payload: MyHostedTokenizationPayload,
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

  const result = await hostedTokenizationService(
    getConnectionServiceProps(customConfig),
    getMyHostedTokenizationServicePayload(customConfig, cart, payload),
  );

  return result;
}
