import { env } from 'process';
// eslint-disable-next-line import/no-extraneous-dependencies
import SdkAuth from '@commercetools/sdk-auth';

export class AuthClient {
  authClient: SdkAuth;

  constructor() {
    this.authClient = new SdkAuth({
      host: env.CTP_AUTH_URL,
      projectKey: env.CTP_PROJECT_KEY,
      disableRefreshToken: false,
      credentials: {
        clientId: env.CTP_CLIENT_ID,
        clientSecret: env.CTP_CLIENT_SECRET,
      },
      scopes: [env.CTP_SCOPES],
      fetch,
    });
  }

  async getAccessToken() {
    try {
      return this.authClient.anonymousFlow();
    } catch (error) {
      return error;
    }
  }
}
