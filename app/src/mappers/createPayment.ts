import { Cart } from '@worldline/ctintegration-ct';
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
  cart: Cart,
  payload: ICreatePaymentPayload,
) {
  const { hostedTokenizationId, returnUrl, acceptHeader, userAgent } = payload;
  const { authorizationMode, merchantReference, skip3dsAuthentication } =
    customConfig;

  // Concat with the merchant reference
  const paymentId = getFormattedPaymentId(
    merchantReference,
    reference.referenceId,
  );

  const skipAuthentication = skip3dsAuthentication || false;
  const amount = cart?.taxedPrice?.totalGross.centAmount || 0;
  const currencyCode = cart?.taxedPrice?.totalGross.currencyCode || '';
  const merchantCustomerId = cart?.customerId || cart?.anonymousId || '';
  const locale = cart?.locale ? { locale: cart.locale } : {};

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
        merchantCustomerId,
        device: {
          ...locale,
          acceptHeader,
          userAgent,
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
  cart: Cart,
  payload: { storeId: string },
  payment?: { id: string },
) {
  const { merchantReference, authorizationMode } = customConfig;
  const cartId = cart.id;
  const { storeId } = payload;

  // Concat with the merchant reference
  const paymentId = getFormattedPaymentId(
    merchantReference,
    reference.referenceId,
  );

  return {
    authMode: authorizationMode as $Enums.Modes,
    paymentId,
    worldlineId: payment?.id?.toString() || '',
    storeId,
    cartId,
    orderId: '',
    storePermanently: false, // TODO: will confirm
  };
}

export async function getCreatedPaymentMappedResponse(
  payment: ICreatePaymentResponse,
  dbPayment: { id: string },
) {
  const {
    id: worldlineId = '',
    actionType = '',
    redirectURL = '',
  } = payment || {};

  const { id = '' } = dbPayment || {};

  return {
    id,
    worldlineId,
    actionType,
    redirectURL,
  };
}
