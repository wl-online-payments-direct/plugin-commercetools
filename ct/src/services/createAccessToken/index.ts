import { AuthClient } from '../../clients';

export async function getAccessToken() {
  // Initialize auth client
  const authClient = new AuthClient();

  const token = await authClient.getAccessToken();
  if (!token) {
    throw {
      message: 'Failed to create access token',
      statusCode: 500,
    };
  }

  return token;
}
