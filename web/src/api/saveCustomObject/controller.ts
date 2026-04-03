import { ServerResponse } from 'http';
import {
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
  authenticateSession,
} from '@worldline/ctintegration-util';
import { saveCustomObjectRequest } from '../../lib';
import { Request, ErrorProps } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;
    logger().debug(`[SaveCustomObject] Request initiated with method: ${method}`);

    await isPostRequestOrThrowError(method);

    await authenticateSession(request, response);

    logger().debug('[SaveCustomObject] Process started');

    const result = await saveCustomObjectRequest(request);

    logger().debug('[SaveCustomObject] Process completed');

    ResponseClient.setResponseTo200(
      response,
      result.body.data.createOrUpdateCustomObject,
    );
  } catch (e) {
    const error = e as ErrorProps;
    logger().error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
