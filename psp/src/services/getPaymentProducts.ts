import { logger } from '@worldline/ctintegration-util';
import { connectService, getExtraHeaders } from '../client';
import { ConnectOpts } from '../types';

export async function getPaymentProducts(
  connectOpts: ConnectOpts,
  payload: { countryCode: string; currencyCode: string },
) {
  const { merchantId } = connectOpts;
  const { countryCode, currencyCode } = payload;

  const client = await connectService(connectOpts);

  const result = await client.products.getPaymentProducts(merchantId, {
    countryCode,
    currencyCode,
    extraHeaders: getExtraHeaders(connectOpts),
  });

  if (result?.body?.errors) {
    logger().error(
      `[GetPaymentProducts] Failed to process the service: ${JSON.stringify(
        result?.body?.errors,
      )}`,
    );
    throw {
      message: 'Failed to process the get payment products service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return result.body;
}
