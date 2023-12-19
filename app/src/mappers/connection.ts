import { ConnectionProps } from '../types';

export function getConnectionServiceProps(props: ConnectionProps) {
  return (({
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
    enableLogs,
  }) => ({
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
    enableLogs,
  }))(props);
}
