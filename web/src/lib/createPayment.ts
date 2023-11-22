import { createPayment } from '@worldline/app-integration';
import { Request } from './types';

export async function createPaymentRequest(request: Request) {
  try {
    const { projectId, storeId, hostedTokenizationId } = request.body;

    if (!projectId || !storeId || !hostedTokenizationId) {
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

    // Perform create payment request to app
    const options = {
      authToken,
      projectId,
      storeId,
      hostedTokenizationId,
    };

    const result = await createPayment(options);

    return result;
  } catch (error) {
    throw error;
  }
}
