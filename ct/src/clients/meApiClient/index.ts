import { env } from 'process';
import { GraphQLClient } from '../graphqlClient';

export class MeApiClient {
  gClient: GraphQLClient;

  projectKey: string;

  query!: string;

  variables = {} as { [key: string]: string };

  headers = {} as { [key: string]: string };

  bearerToken?: string;

  constructor(props: { authToken: string }) {
    this.gClient = new GraphQLClient();
    this.bearerToken = props?.authToken;

    if (!this.bearerToken) {
      throw { message: 'Unauthorized request', statusCode: 401 };
    }

    this.gClient.setClientwithExistingTokenFlow({
      apiHost: env.CTP_API_URL as string,
      bearerToken: this.bearerToken,
    });

    this.projectKey = env.CTP_PROJECT_KEY as string;
  }

  setBody({
    query,
    variables,
  }: {
    query: string;
    variables: { [key: string]: string };
  }) {
    this.query = query;
    this.variables = variables;
  }

  async execute() {
    try {
      return this.gClient
        .getApiRoot()
        .withProjectKey({ projectKey: this.projectKey })
        .graphql()
        .post({
          body: {
            query: this.query,
            variables: this.variables,
          },
        })
        .execute()
        .catch((e) => {
          throw {
            statusCode: e.statusCode,
            message: '[CT] Failed to execute the request!',
            details: e.body.errors,
          };
        });
    } catch (error) {
      return error;
    }
  }
}
