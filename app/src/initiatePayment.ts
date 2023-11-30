import { getCartById, getCustomObjects } from '@worldline/ct-integration';
import { hostedTokenizationService } from '@worldline/psp-integration';
import { InitPaymentPayload } from './types';
import {
  getTokenizationServicePayload,
  getConnectionServiceProps,
} from './mappers';

export async function initiatePaymentSession(payload: InitPaymentPayload) {
  const { authToken, storeId, cartId } = payload;

  // Fetch cart from Commercetools
  const cart = await getCartById(cartId);

  if (!cart) {
    throw { message: 'Failed to fetch the cart data', statusCode: 401 };
  }

  // Fetch variant from admin config
  const customConfig = await getCustomObjects(authToken, storeId);
  const { variant } = customConfig;

  const result = await hostedTokenizationService(
    getConnectionServiceProps(customConfig),
    getTokenizationServicePayload({ variant, locale: 'en-US', payload }),
  );

  return result;
}
