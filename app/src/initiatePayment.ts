import { getCustomObjects, getMyCart } from '@worldline/ct-integration';
import { hostedTokenizationService } from '@worldline/psp-integration';
import { InitializePaymentPayload } from './types';
import {
  getTokenizationServicePayload,
  getConnectionServiceProps,
} from './mappers';

export async function initiatePaymentSession(
  payload: InitializePaymentPayload,
) {
  // Fetch customer cart from Commercetools
  const activeCart = await getMyCart(payload.authToken);
  const customConfig = await getCustomObjects(payload.storeId);

  const result = await hostedTokenizationService(
    getConnectionServiceProps(customConfig),
    getTokenizationServicePayload(customConfig, activeCart, payload),
  );

  return result;
}
