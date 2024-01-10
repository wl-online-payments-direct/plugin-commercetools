import { AuthClient } from '../../clients';

export async function getClientCredentialsToken() {
  const authClient = new AuthClient();
  return authClient.getClientCredentialsToken();
}
