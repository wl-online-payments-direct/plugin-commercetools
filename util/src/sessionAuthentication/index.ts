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
  const { EXTERNAL_API_URL } = env;
  try {
    if (!EXTERNAL_API_URL) {
      logger().error('Environment variable EXTERNAL_API_URL is not defined');
      return;
    }
    const sessionAuthVerifier = createSessionAuthVerifier({
      audience: EXTERNAL_API_URL,
      issuer: CLOUD_IDENTIFIERS.GCP_EU,
    });
    await sessionAuthVerifier(request, response);
  } catch (error) {
    logger().error(
      `Unauthorized request to the external API ${EXTERNAL_API_URL}. Error: ${JSON.stringify(
        error,
      )}`,
    );
    throw { statusCode: 401, message: 'Unauthorized request' };
  }
};

export { authenticateSession };
