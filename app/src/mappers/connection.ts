import { ConnectionProps } from '../types';

export function getConnectionServiceProps(props: ConnectionProps) {
  return (({
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
    enablePspLogs,
  }) => ({
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
    enablePspLogs,
  }))(props);
}
