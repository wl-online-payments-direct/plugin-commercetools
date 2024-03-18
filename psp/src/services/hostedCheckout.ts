import { getFormattedHostedCheckoutResult } from '../mappers';
import { connectService, getExtraHeaders } from '../client';
import {
  HostedCheckoutPayload,
  HostedCheckoutResponse,
  ConnectOpts,
} from '../types';

export async function hostedCheckoutService(
  connectOpts: ConnectOpts,
  payload: HostedCheckoutPayload,
): Promise<HostedCheckoutResponse> {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.hostedCheckout.createHostedCheckout(
    merchantId,
    payload,
    {
      extraHeaders: getExtraHeaders(connectOpts),
    },
  );

  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the hosted checkout service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return getFormattedHostedCheckoutResult(result?.body);
}
