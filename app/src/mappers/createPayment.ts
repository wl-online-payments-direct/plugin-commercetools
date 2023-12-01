import { Cart, Customer } from '@worldline/ctintegration-ct';
import { $Enums } from '@worldline/ctintegration-db';
import {
  CustomObjects,
  ICreatePaymentPayload,
  ICreatePaymentResponse,
} from '../types';

const getFormattedPaymentId = (
  merchantReference: string,
  referenceId: number,
) => `${merchantReference}-${referenceId.toString()}`;

export function getServicePayload(
  customConfig: CustomObjects,
  reference: { referenceId: number },
  myCart: { cart: Cart; customer: Customer },
  payload: ICreatePaymentPayload,
) {
  const { hostedTokenizationId, returnUrl } = payload;
  const { cart, customer } = myCart;
  const { authorizationMode, merchantReference } = customConfig;

  // Concat with the merchant reference
  const paymentId = getFormattedPaymentId(
    merchantReference,
    reference.referenceId,
  );

  const skipAuthentication = false;

  const amount = cart?.taxedPrice?.totalGross.centAmount || 0;
  const currencyCode = cart?.taxedPrice?.totalGross.currencyCode || '';

  return {
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
        amount,
        currencyCode,
      },
    },
  };
}

export function getDatabasePayload(
  customConfig: CustomObjects,
  reference: { referenceId: number },
  myCart: { cart: Cart; customer: Customer },
  payload: ICreatePaymentPayload,
  payment: { id: number },
) {
  const { merchantReference, authorizationMode } = customConfig;
  const cartId = myCart.cart.id;
  const { storeId } = payload;

  // Concat with the merchant reference
  const paymentId = getFormattedPaymentId(
    merchantReference,
    reference.referenceId,
  );

  return {
    authMode: authorizationMode as $Enums.Modes,
    paymentId,
    worldlineId: payment.id.toString(),
    storeId,
    cartId,
    orderId: '',
  };
}

export async function getMappedResponse(result: ICreatePaymentResponse) {
  const selectedFields = (({ redirectURL }) => ({
    redirectURL,
  }))(result);
  return selectedFields;
}
