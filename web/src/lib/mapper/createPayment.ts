import { CreatePaymentPayload, Request } from '../types';

export function getCreatePaymentRequiredProps(request: Request) {
  const {
    cartId = '',
    storeId = '',
    hostedTokenizationId = '',
    returnUrl = '',
  } = (request?.body || {}) as CreatePaymentPayload;

  return {
    cartId,
    storeId,
    hostedTokenizationId,
    returnUrl,
  };
}

export function getCreatePaymentAppPayload(request: Request) {
  const userAgent = request.headers['user-agent'] || '';
  const authToken = request.headers.authorization || '';
  const acceptHeader = request.headers.accept || '';

  const {
    cartId = '',
    storeId = '',
    hostedTokenizationId = '',
    returnUrl = '',
    device: {
      timezoneOffsetUtcMinutes = 0,
      browserData: {
        screenHeight = 0,
        screenWidth = 0,
        javaEnabled = false,
        colorDepth = 0,
      },
    },
  } = (request.body || {}) as CreatePaymentPayload;

  return {
    authToken,
    userAgent,
    acceptHeader,
    storeId,
    cartId,
    hostedTokenizationId,
    returnUrl,
    device: {
      timezoneOffsetUtcMinutes,
      browserData: {
        screenHeight,
        screenWidth,
        javaEnabled,
        colorDepth,
      },
    },
  };
}
