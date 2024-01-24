import { Cart } from '@worldline/ctintegration-ct';
import { CustomObjects, MyHostedTokenizationPayload } from '../types';

export function getMyHostedTokenizationServicePayload(
  customConfig: CustomObjects,
  cart: Cart,
  payload: MyHostedTokenizationPayload,
) {
  const { variant } = customConfig;
  const { tokens, askConsumerConsent } = payload;
  const locale = cart?.locale ? { locale: cart.locale } : {};
  return {
    ...locale,
    variant,
    tokens,
    askConsumerConsent,
  };
}
