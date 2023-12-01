import { testConnection } from '@worldline/ctintegration-app';
import { hasRequiredParamsInBody } from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getTestConnectionRequiredProps,
  testConnectionAppPayload,
} from './mapper';

export async function testConnectionRequest(request: Request) {
  hasRequiredParamsInBody(getTestConnectionRequiredProps(request));
  return testConnection(testConnectionAppPayload(request));
}
