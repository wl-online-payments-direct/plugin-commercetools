export interface TestConnectionPayload {
  merchantId: string;
  integrator: string;
  apiKey: string;
  apiSecret: string;
  host: string;
  enableLogs?: boolean;
}
