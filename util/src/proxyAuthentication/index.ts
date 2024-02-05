// eslint-disable-next-line import/no-import-module-exports
import {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';

const sessionAuthVerifier = createSessionAuthVerifier({
  audience: 'https://f73b-103-149-158-4.ngrok-free.app',
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
});

const sessionAuth = async (request: any, response: any) => {
  try {
    await sessionAuthVerifier(request, response);
  } catch (error) {
    throw { statusCode: 401, message: 'Unauthorized' };
  }
};

export default sessionAuth;
