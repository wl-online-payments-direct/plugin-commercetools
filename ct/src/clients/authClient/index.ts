import { env } from 'process';
import SdkAuth from '@commercetools/sdk-auth';
import { ClientCredentialsToken } from '../../types';

export class AuthClient {
  authClient;

  constructor() {
    if (!this.authClient) {
      this.authClient = new SdkAuth({
        host: env.CTP_AUTH_URL,
        projectKey: env.CTP_PROJECT_KEY,
        disableRefreshToken: true,
        credentials: {
          clientId: env.CTP_CLIENT_ID,
          clientSecret: env.CTP_CLIENT_SECRET,
        },
        scopes: [env.CTP_SCOPES],
        fetch,
      });
    }
  }

  async getClientCredentialsToken(): Promise<ClientCredentialsToken> {
    return this.authClient.clientCredentialsFlow();
  }
}
