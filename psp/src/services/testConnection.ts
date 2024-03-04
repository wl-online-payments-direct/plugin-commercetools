import { connectService, getExtraHeaders } from '../client';
import { ConnectOpts } from '../types';

export async function testConnectionService(
  connectOpts: ConnectOpts,
): Promise<boolean> {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.services.testConnection(merchantId, {
    extraHeaders: getExtraHeaders(connectOpts),
  });

  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the test connection',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return !!result?.isSuccess;
}
