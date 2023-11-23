import { getPaymentStatus } from '@worldline/app-integration';
import { Request } from './types';
import { getQuery } from './mapper';

export async function getPaymentStatusRequest(request: Request) {
  const { paymentId, storeId } = getQuery(request);

  if (!storeId) {
    throw {
      message: 'Required query parameter `storeId` is missing',
      statusCode: 400,
    };
  }

  if (!paymentId) {
    throw {
      message: 'Required query parameters `paymentId` is missing',
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

  // // Perform get payment request to app
  const options = {
    authToken,
    storeId: storeId as string,
    paymentId: paymentId as string,
  };

  const result = await getPaymentStatus(options);

  return result;
  
}
