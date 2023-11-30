import { Cart } from '@worldline/ctintegration-ct';
import { CustomObjects, InitializePaymentPayload } from '../types';

export function getTokenizationServicePayload(
  customConfig: CustomObjects,
  activeCart: { cart: Cart },
  payload: InitializePaymentPayload,
) {
  const { variant } = customConfig;
  const { tokens, askConsumerConsent } = payload;
  const locale = activeCart?.cart?.locale || 'en-US';
  return {
    locale,
    variant,
    tokens,
    askConsumerConsent,
  };
}
