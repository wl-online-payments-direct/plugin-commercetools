import fetch from 'cross-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

export declare type Options = {
  authHost: string;
  apiHost: string;
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes?: Array<string>;
};

export class GraphQLClient {
  apiRoot!: ApiRoot;

  setClientWithAuthMiddlewareOptions(props: Options) {
    const { authHost, projectKey, clientId, clientSecret, scopes, apiHost } =
      props;
    // Configure authMiddlewareOptions
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: authHost,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
      fetch,
    };

    // Configure httpMiddlewareOptions
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: apiHost,
      fetch,
    };
    // ClientBuilder
    const ctpClient = new ClientBuilder()
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    // Create a API root from API builder of commercetools platform client
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient);
  }

  setClientwithExistingTokenFlow(props: {
    apiHost: string;
    bearerToken: string;
  }) {
    const { apiHost, bearerToken } = props;

    // Configure httpMiddlewareOptions
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: apiHost,
      fetch,
    };

    // ClientBuilder
    const ctpClient = new ClientBuilder()
      .withExistingTokenFlow(bearerToken, { force: true })
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    // Create a API root from API builder of commercetools platform client
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient);
  }

  getApiRoot() {
    return this.apiRoot;
  }
}
