import { sendEmailPayload, Request } from '../types';

export function getSendEmailRequiredProps(request: Request) {
  const {
    storeId = '',
    pspId = '',
    companyName = '',
    message = '',
    platformVersion = '',
    pluginVersion = '',
  } = (request?.body || {}) as sendEmailPayload;

  return {
    storeId,
    pspId,
    companyName,
    message,
    platformVersion,
    pluginVersion,
  };
}

export function getSendEmailAppPayload(request: Request) {
  const {
    storeId = '',
    pspId = '',
    companyName = '',
    message = '',
    platformVersion = '',
    pluginVersion = '',
  } = (request?.body || {}) as sendEmailPayload;

  return {
    storeId,
    pspId,
    companyName,
    message,
    platformVersion,
    pluginVersion,
  };
}
