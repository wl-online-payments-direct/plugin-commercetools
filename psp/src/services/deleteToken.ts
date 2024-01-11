import { connectService } from '../client';
import { ConnectOpts } from '../types';

export async function deleteTokenService(
  connectOpts: ConnectOpts,
  token: string,
): Promise<boolean> {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = await client.tokens.removeToken(merchantId, token, {});
  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the token deletion',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return result?.isSuccess;
}
