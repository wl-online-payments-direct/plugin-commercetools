import { AuthClient } from '../../clients';

export async function getClientCredentialsToken() {
  // Initialize auth client
  const authClient = new AuthClient();

  const token = await authClient.getClientCredentialsToken();
  if (!token) {
    throw {
      message: 'Failed to create client credential token',
      statusCode: 500,
    };
  }

  return token;
}
