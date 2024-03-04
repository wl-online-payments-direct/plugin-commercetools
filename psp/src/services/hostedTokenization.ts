import { getFormattedHostedTokenizationResult } from '../mappers';
import { connectService, getExtraHeaders } from '../client';
import {
  HostedTokenizationPayload,
  HostedTokenizationResponse,
  ConnectOpts,
} from '../types';

export async function hostedTokenizationService(
  connectOpts: ConnectOpts,
  payload: HostedTokenizationPayload,
): Promise<HostedTokenizationResponse> {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.hostedTokenization.createHostedTokenization(
    merchantId,
    payload,
    {
      extraHeaders: getExtraHeaders(connectOpts),
    },
  );

  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the hosted tokenization service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return getFormattedHostedTokenizationResult(result?.body);
}
