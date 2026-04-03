import { saveCustomObjects, SaveCustomObjectPayload } from '@worldline/ctintegration-ct';
import { hasRequiredParamsInBody, logger } from '@worldline/ctintegration-util';
import { Request } from './types';

interface SaveCustomObjectBody {
  key: string;
  value: {
    mode: string;
    live?: Record<string, unknown>;
    test?: Record<string, unknown>;
    [key: string]: unknown;
  };
}

function getSaveCustomObjectRequiredProps(request: Request) {
  const body = (request.body || {}) as SaveCustomObjectBody;
  return {
    key: body.key,
  };
}

function getSaveCustomObjectPayload(request: Request): SaveCustomObjectPayload {
  const body = (request.body || {}) as SaveCustomObjectBody;
  return {
    key: body.key,
    value: body.value,
  };
}

export async function saveCustomObjectRequest(request: Request) {
  logger().debug('[SaveCustomObject] Validation started');
  hasRequiredParamsInBody(getSaveCustomObjectRequiredProps(request));
  logger().debug('[SaveCustomObject] Validation succeeded');

  logger().debug('[SaveCustomObject] App process started');
  const result = await saveCustomObjects(getSaveCustomObjectPayload(request));
  logger().debug('[SaveCustomObject] App process completed');
  
  return result;
}
