import Constants from '../../constants';
import { HostedCheckoutPayload, Request } from '../types';

export function getHostedCheckoutRequiredProps(request: Request) {
  const {
    storeId = '',
    cartId = '',
    returnUrl = '',
    paymentMethod = '',
    paymentProductId,
  } = (request?.body || {}) as HostedCheckoutPayload;

  const paymentMethods = [
    Constants.PAYMENT.REDIRECTMODE_B.PAYMENT_METHOD,
    Constants.PAYMENT.ONSITEMODE.PAYMENT_METHOD,
  ];

  return {
    // paymentProductId only required for Redirect mode A
    ...(!paymentMethods.includes(paymentMethod) ? { paymentProductId } : {}),
    paymentMethod,
    storeId,
    cartId,
    returnUrl,
  };
}

export function getHostedCheckoutAppPayload(request: Request) {
  const userAgent = request.headers['user-agent'] || '';
  const authToken = request.headers.authorization || '';
  const acceptHeader = request.headers.accept || '';
  const {
    paymentProductId,
    paymentMethod = '',
    storeId = '',
    cartId = '',
    tokens = '',
    returnUrl = '',
  } = (request?.body || {}) as HostedCheckoutPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    paymentProductId,
    paymentMethod,
    storeId,
    cartId,
    returnUrl,
    tokens,
  };
}
