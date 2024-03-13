import { Request, DeleteTokenAppPayload } from '../types';

export function getDeleteTokenRequiredProps(request: Request) {
  const { storeId = '', customerPaymentTokenId = '' } = (request?.body ||
    {}) as DeleteTokenAppPayload;
  return {
    storeId,
    customerPaymentTokenId,
  };
}

export function getDeleteTokenAppPayload(
  request: Request,
): DeleteTokenAppPayload {
  const {
    storeId = '',
    customerPaymentTokenId = '',
    customerEmail,
    customerId,
  } = (request.body || {}) as DeleteTokenAppPayload;

  return {
    storeId,
    customerPaymentTokenId,
    customerEmail: customerEmail || '',
    customerId: customerId || '',
  };
}
