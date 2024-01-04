import { env } from 'process';
import SdkAuth from '@commercetools/sdk-auth';

export class AuthClient {
  authClient;

  constructor() {
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

  async getClientCredentialsToken() {
    return this.authClient.clientCredentialsFlow();
  }
}
