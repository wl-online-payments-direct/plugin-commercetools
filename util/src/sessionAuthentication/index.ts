import {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';
import { env } from 'process';
import { IncomingMessage, ServerResponse } from 'http';
import { logger } from '../logger';

const authenticateSession = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const { APP_DOMAIN } = env;
  try {
    if (!APP_DOMAIN) {
      logger().error('Environment variable APP_DOMAIN is not defined');
      throw {
        statusCode: 500,
        message: 'Failed to fetch the configuration for request to the API',
      };
    }
    const sessionAuthVerifier = createSessionAuthVerifier({
      audience: APP_DOMAIN,
      issuer: CLOUD_IDENTIFIERS.GCP_EU,
    });
    await sessionAuthVerifier(request, response);
  } catch (error) {
    logger().error(
      `Unauthorized request to the API ${APP_DOMAIN}. Error: ${JSON.stringify(
        error,
      )}`,
    );
    throw { statusCode: 401, message: 'Unauthorized request' };
  }
};

export { authenticateSession };
