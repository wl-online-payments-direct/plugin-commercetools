export interface ConnectOpts {
  merchantId: string;
  integrator: string;
  apiKey: string;
  apiSecret: string;
  host: string;
}
export interface TestConnectionResponse {
  result: string;
}
