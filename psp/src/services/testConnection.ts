import { connectService } from '../client';
import { ConnectOpts } from '../types';

export async function testConnectionService(
  options: ConnectOpts,
): Promise<boolean> {
  const { merchantId } = options;
  const client = await connectService(options);
  const result = await client.services.testConnection(merchantId, {});

  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the test connection',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return !!result?.isSuccess;
}
