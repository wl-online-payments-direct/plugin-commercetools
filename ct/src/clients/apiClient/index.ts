import { env } from "process"

import { GraphQLClient } from "../graphqlClient"

export class ApiClient {
  gClient: GraphQLClient
  projectKey: string
  query!: string
  variables = {} as { [key: string]: string | number }

  constructor() {
    this.gClient = new GraphQLClient()

    this.gClient.setClientWithAuthMiddlewareOptions({
      apiHost: env.CTP_API_URL as string,
      authHost: env.CTP_AUTH_URL as string,
      projectKey: env.CTP_PROJECT_KEY as string,
      clientId: env.CTP_CLIENT_ID as string,
      clientSecret: env.CTP_CLIENT_SECRET as string,
      scopes: [env.CTP_SCOPES] as unknown as Array<string>,
    })

    this.projectKey = env.CTP_PROJECT_KEY as string
  }

  setBody({ query, variables }: { query: string; variables: { [key: string]: any } }) {
    this.query = query
    this.variables = variables
  }

  async getData() {
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
    } catch (error) {
      return error
    }
  }
}
