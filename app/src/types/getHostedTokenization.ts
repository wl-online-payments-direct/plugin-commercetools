export interface GetHostedTokenizationPayload {
  storeId: string;
  hostedTokenizationId: string;
}

export interface GetHostedTokenizationResponse {
  token?: {
    isTemporary?: boolean;
  };
}
