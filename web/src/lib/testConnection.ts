import { testConnection } from '@worldline/ctintegration-app';
import { hasRequiredParamsInBody } from '@worldline/ctintegration-util';
import { Request } from './types';
import { testConnectionAppPayload } from './mapper';

export async function testConnectionRequest(request: Request) {
  hasRequiredParamsInBody(request, [
    'merchantId',
    'integrator',
    'apiKey',
    'apiSecret',
    'host',
  ]);
  return testConnection(testConnectionAppPayload(request));
}
