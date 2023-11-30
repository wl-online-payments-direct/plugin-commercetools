import { InitServicePayload } from '../types';

export function getTokenizationServicePayload({
  variant,
  locale,
  payload,
}: InitServicePayload) {
  const { tokens, askConsumerConsent } = payload;

  const hostedTokenizationPayload = {
    locale,
    variant,
    tokens,
    askConsumerConsent,
  };

  return hostedTokenizationPayload;
}
