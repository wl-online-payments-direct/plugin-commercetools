import { ServerResponse } from 'http';
import {
  authenticateSession,
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { downloadLog } from '../../lib';
import { ErrorProps, Request } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;
    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(method);

    // Authenticate the session
    await authenticateSession(request, response);

    await downloadLog(request, response);
  } catch (e) {
    const error = e as ErrorProps;
    logger().error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};
export default { processRequest };
