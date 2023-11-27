import { connectService } from '../client';
import { ConnectOpts, TestConnectionResponse } from '../types';

export async function testConnectionService(
  options: ConnectOpts,
): Promise<TestConnectionResponse> {
  const { merchantId } = options;
  const client = await connectService(options);
  const { isSuccess, body } = await client.services.testConnection(
    merchantId,
    {},
  );

  if (body?.errors) {
    throw {
      message: 'Failed to process the test connection',
      statusCode: body.status,
      details: body?.errors,
    };
  }

  return isSuccess;
}
