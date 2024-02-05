export interface ClientCredentialsToken {
  access_token: string;
  expires_in: number; // lifetime of access_token in seconds
  expires_at: number; // UTC datetime in unix timestamp format when the token expires
  scope: string;
  token_type: string;
}
