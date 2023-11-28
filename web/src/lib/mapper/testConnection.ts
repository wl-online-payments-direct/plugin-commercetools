import { Request } from '../types';

export function testConnectionAppPayload(request: Request) {
  const { merchantId, integrator, apiKey, apiSecret, host } = request.body;
  return { merchantId, integrator, apiKey, apiSecret, host };
}
