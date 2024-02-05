import {
  HostedCheckoutResponse,
  HostedCheckoutServiceResponse,
} from '../types';

export async function getFormattedHostedCheckoutResult(
  body: HostedCheckoutServiceResponse,
): Promise<HostedCheckoutResponse> {
  const { hostedCheckoutId = '', redirectUrl = '' } = body || {};
  return {
    hostedCheckoutId,
    redirectUrl,
  };
}
