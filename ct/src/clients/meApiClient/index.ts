import { env } from "process"
import { IncomingMessage } from "http"

import { GraphQLClient } from "../graphqlClient"

export class MeApiClient {
  gClient: GraphQLClient
  projectKey: string
  query!: string
  variables = {} as { [key: string]: string }
  headers = {} as { [key: string]: string }
  bearerToken?: string

  constructor(props: { request: IncomingMessage }) {
    this.gClient = new GraphQLClient()
    this.bearerToken = props?.request?.headers?.["authorization"]

    if (!this.bearerToken) {
      throw { message: "Unauthorized request", statusCode: 401 }
    }

    this.gClient.setClientwithExistingTokenFlow({
      apiHost: env.CTP_API_URL as string,
      bearerToken: this.bearerToken,
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
