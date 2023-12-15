import { ServerResponse } from 'http';
import {
  isGetRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/ctintegration-util';
import { getWebhookStatusRequest } from '../../lib';
import { ErrorProps, Request } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    // Only allow GET request; else throw error
    await isGetRequestOrThrowError(request.method);

    const data = await getWebhookStatusRequest(request);

    ResponseClient.setResponseTo200(response, data);
  } catch (e) {
    const error = e as ErrorProps;
    logger.error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
