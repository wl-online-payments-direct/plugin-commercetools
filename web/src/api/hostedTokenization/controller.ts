import { ServerResponse } from 'http';
import {
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { hostedTokenizationRequest } from '../../lib';
import { ErrorProps, Request } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(request.method);
    const data = await hostedTokenizationRequest(request);
    ResponseClient.setResponseTo200(response, data);
  } catch (e) {
    const error = e as ErrorProps;
    logger().error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
