import { testConnection } from '@worldline/ctintegration-app';
import { hasRequiredParamsInBody, logger } from '@worldline/ctintegration-util';
import { Request } from './types';
import {
  getTestConnectionRequiredProps,
  testConnectionAppPayload,
} from './mapper';

export async function testConnectionRequest(request: Request) {
  logger().debug('[TestConnection] Validation started');
  hasRequiredParamsInBody(getTestConnectionRequiredProps(request));
  logger().debug('[TestConnection] Validation succeded');

  logger().debug('[TestConnection] App process started');
  return testConnection(testConnectionAppPayload(request));
}
