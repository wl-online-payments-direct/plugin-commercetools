import { connectService, getExtraHeaders } from '../client';
import { ConnectOpts } from '../types';

export async function getHostedTokenizationService(
  connectOpts: ConnectOpts,
  hostedTokenizationId: string,
) {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.hostedTokenization.getHostedTokenization(
    merchantId,
    hostedTokenizationId,
    {
      extraHeaders: getExtraHeaders(connectOpts),
    },
  );
  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the get hosted tokenization service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return result.body;
}
