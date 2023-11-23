import { ServerResponse } from 'http';
import {
  isPostRequestOrThrowError,
  logger,
  ResponseClient,
} from '@worldline/util-integration';
import { testConnectionRequest } from '../../lib';
import { Request, ErrorProps } from '../../lib/types';

const processRequest = async (request: Request, response: ServerResponse) => {
  try {
    const { method } = request;

    // Only allow POST request; else throw error
    await isPostRequestOrThrowError(method);

    const { merchantId, integrator, apiKey, apiSecret, host } = request.body;

    if (!merchantId || !integrator || !apiKey || !apiSecret || !host) {
      throw {
        message: 'Required parameters are missing or empty',
        statusCode: 400,
      };
    }

    // Perform a test connection request to psp
    const options = { merchantId, integrator, apiKey, apiSecret, host };
    const connection = await testConnectionRequest(options);

    ResponseClient.setResponseTo200(response, { connection });
  } catch (e) {
    const error = e as ErrorProps;
    logger.error(JSON.stringify(error));
    ResponseClient.setResponseError(response, error);
  }
};

export default { processRequest };
