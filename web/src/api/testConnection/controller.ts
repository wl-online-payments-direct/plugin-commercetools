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

    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(method);

    const connection = await testConnectionRequest(request);

    ResponseClient.setResponseTo200(response, { connection });
  } catch (e) {
    const error = e as ErrorProps;
    logger.error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
