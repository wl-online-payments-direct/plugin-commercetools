import { ServerResponse } from 'http';
import {
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { hostedMyCheckoutRequest } from '../../lib';
import { Request, ErrorProps } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;
    logger().debug(
      `[InitHostedCheckout] Request initiated with method: ${method}`,
    );

    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(method);

    logger().debug('[InitHostedCheckout] Process started');

    const data = await hostedMyCheckoutRequest(request);

    logger().debug('[InitHostedCheckout] Process completed');

    ResponseClient.setResponseTo200(response, data);
  } catch (e) {
    const error = e as ErrorProps;
    logger().error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
