import { Request } from '../types';
import { pick } from './common';

export function getTestConnectionRequiredProps(request: Request) {
  return pick(request.body, [
    'merchantId',
    'integrator',
    'apiKey',
    'apiSecret',
    'host',
  ]);
}

export function testConnectionAppPayload(request: Request) {
  return pick(request.body, [
    'merchantId',
    'integrator',
    'apiKey',
    'apiSecret',
    'host',
    'enablePspLogs',
  ]);
}
