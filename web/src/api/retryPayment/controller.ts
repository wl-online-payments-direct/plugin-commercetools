import { ServerResponse } from 'http';
import {
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { retryPayment } from '../../lib';
import { ErrorProps, Request } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;
    logger().debug(`[RetryPayment] Request initiated with method: ${method}`);

    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(method);

    logger().debug('[RetryPayment] Process started');

    const data = await retryPayment(request);

    logger().debug('[RetryPayment] Process completed');

    ResponseClient.setResponseTo200(response, data);
  } catch (e) {
    const error = e as ErrorProps;
    logger().error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};
export default { processRequest };
