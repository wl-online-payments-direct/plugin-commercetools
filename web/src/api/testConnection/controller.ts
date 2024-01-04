import { ServerResponse } from 'http';
import {
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { testConnectionRequest } from '../../lib';
import { Request, ErrorProps } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;
    logger().debug(`[TestConnection] Request initiated with method: ${method}`);

    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(method);

    logger().debug('[TestConnection] Process started');

    const connection = await testConnectionRequest(request);

    logger().debug('[TestConnection] Process completed');

    ResponseClient.setResponseTo200(response, { connection });
  } catch (e) {
    const error = e as ErrorProps;
    logger().error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
