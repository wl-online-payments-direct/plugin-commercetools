import { ServerResponse } from 'http';
import {
  isGetRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { loadMyPaymentMethods } from '../../lib';
import { ErrorProps, Request } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;
    // Only allow GET request; else throw error
    await isGetRequestOrThrowError(method);

    const data = await loadMyPaymentMethods(request);
    ResponseClient.setResponseTo200(response, data);
  } catch (e) {
    const error = e as ErrorProps;
    logger().error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};
export default { processRequest };