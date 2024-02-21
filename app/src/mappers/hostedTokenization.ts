import { Cart } from '@worldline/ctintegration-ct';
import { CustomObjects, HostedTokenizationPayload } from '../types';

export function getTokenizationServicePayload(
  customConfig: CustomObjects,
  cart: Cart,
  payload: HostedTokenizationPayload,
) {
  const { templateFileName: variant = '' } = customConfig?.onSiteMode || {};
  const { tokens, askConsumerConsent } = payload;
  const locale = cart?.locale ? { locale: cart.locale } : {};

  return {
    ...locale,
    variant,
    tokens,
    askConsumerConsent,
  };
}
