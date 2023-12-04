export interface ConnectOpts {
  merchantId: string;
  integrator: string;
  apiKey: string;
  apiSecret: string;
  host: string;
  enablePspLogs: boolean;
}
export interface TestConnectionResponse {
  result: string;
}
