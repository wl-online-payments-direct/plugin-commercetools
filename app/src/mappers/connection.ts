import { ConnectionProps } from '../types';

export function getConnectionServiceProps(props: ConnectionProps) {
  return (({ merchantId, integrator, apiKey, apiSecret, host }) => ({
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
  }))(props);
}
