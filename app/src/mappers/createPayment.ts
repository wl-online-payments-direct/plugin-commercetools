import { DatabasePayload, Response, ServicePayload } from '../types';

export function getServicePayload({
  authorizationMode,
  cart,
  paymentId,
  customer,
  payload,
}: ServicePayload) {
  const { hostedTokenizationId, returnUrl } = payload;

  const skipAuthentication = false;

  const createPaymentPayload = {
    hostedTokenizationId,
    cardPaymentMethodSpecificInput: {
      authorizationMode,
      threeDSecure: {
        skipAuthentication,
        redirectionData: {
          returnUrl,
        },
      },
    },
    order: {
      customer: {
        merchantCustomerId: cart.customerId || customer.id,
        device: {
          acceptHeader:
            'text/html,application/xhtml+xml,application/xmlq=0.9,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3',
          locale: 'en_US',
          timezoneOffsetUtcMinutes: '-180',
          userAgent:
            'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
          browserData: {
            colorDepth: 24,
            javaScriptEnabled: false,
            screenHeight: '1080',
            screenWidth: '1920',
          },
        },
      },
      references: {
        // this key is used to identify the merchant from webhook
        merchantReference: paymentId,
      },
      amountOfMoney: {
        amount: cart.taxedPrice.totalGross.centAmount,
        currencyCode: cart.taxedPrice.totalGross.currencyCode,
      },
    },
  };

  return createPaymentPayload;
}

export function getDatabasePayload({
  authorizationMode,
  cart,
  paymentId,
  storeId,
  payment,
}: DatabasePayload) {
  const payload = {
    authMode: authorizationMode,
    paymentId,
    worldlineId: payment.id.toString(),
    storeId,
    cartId: cart.id,
    orderId: '',
  };

  return payload;
}

export async function getMappedResponse(result: Response) {
  const selectedFields = (({ redirectURL }) => ({
    redirectURL,
  }))(result);
  return selectedFields;
}
