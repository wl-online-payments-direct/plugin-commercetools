import { InitServicePayload } from '../types';

export function getTokenizationServicePayload({
  variant,
  cart,
  payload,
}: InitServicePayload) {
  const { tokens, askConsumerConsent } = payload;

  const hostedTokenizationPayload = {
    locale: cart.locale,
    variant,
    tokens,
    askConsumerConsent,
  };

  return hostedTokenizationPayload;
}
