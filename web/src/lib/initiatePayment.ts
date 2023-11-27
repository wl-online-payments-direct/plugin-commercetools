import { initiatePaymentSession } from '@worldline/app-integration';
import { Request } from './types';

export async function initiatePaymentRequest(request: Request) {
  const {
    storeId,
    cartId,
    tokens = '',
    askConsumerConsent = true, // Default will be true
  } = request.body;

  if (!storeId || !cartId) {
    throw {
      message: 'Required parameters are missing or empty',
      statusCode: 400,
    };
  }

  const { authorization: authToken } = request.headers;

  if (!authToken) {
    throw {
      message: 'Authentication parameters are missing or empty',
      statusCode: 403,
    };
  }

  // Perform a payment request to psp
  const options = {
    authToken,
    storeId,
    cartId,
    tokens,
    askConsumerConsent,
  };

  const result = await initiatePaymentSession(options);

  return result;
}
