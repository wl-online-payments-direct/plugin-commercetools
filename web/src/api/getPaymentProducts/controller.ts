import { ServerResponse } from 'http';
import {
  authenticateSession,
  isGetRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { getPaymentProducts } from '../../lib';
import { ErrorProps, Request } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;
    logger().debug(
      `[GetPaymentProducts] Request initiated with method: ${method}`,
    );

    // Only allow GET request; else throw error
    await isGetRequestOrThrowError(method);

    // Authenticate the session
    await authenticateSession(request, response);

    logger().debug('[GetPaymentProducts] Process started');

    const data = await getPaymentProducts(request);

    logger().debug('[GetPaymentProducts] Process completed');

    ResponseClient.setResponseTo200(response, data);
  } catch (e) {
    const error = e as ErrorProps;
    logger().error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};
export default { processRequest };
