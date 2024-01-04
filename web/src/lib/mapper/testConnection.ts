import { Request, TestConnectionPayload } from '../types';

export function getTestConnectionRequiredProps(request: Request) {
  const {
    merchantId = '',
    integrator = '',
    apiKey = '',
    apiSecret = '',
    host = '',
  } = (request?.body || {}) as TestConnectionPayload;

  return {
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
  };
}

export function testConnectionAppPayload(request: Request) {
  const {
    merchantId = '',
    integrator = '',
    apiKey = '',
    apiSecret = '',
    host = '',
    enableLogs = false,
  } = (request?.body || {}) as TestConnectionPayload;

  return {
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
    enableLogs,
  };
}
