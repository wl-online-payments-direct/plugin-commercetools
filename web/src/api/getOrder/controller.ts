import { ServerResponse } from 'http';
import {
  isGetRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { getOrderRequest } from '../../lib';
import { ErrorProps, Request } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;

    // Only allow GET request; else throw error
    await isGetRequestOrThrowError(method);

    // TODO: will add the authentication

    const data = await getOrderRequest(request);

    ResponseClient.setResponseTo200(response, data);
  } catch (e) {
    const error = e as ErrorProps;
    logger().error('Exception occured in getOrder.', error);
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
