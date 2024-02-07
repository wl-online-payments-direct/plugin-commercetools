import { Cart } from '@worldline/ctintegration-ct';
import { $Enums } from '@worldline/ctintegration-db';
import {
  CustomObjects,
  ICreateMyPaymentPayload,
  ICreatePaymentResponse,
} from '../types';
import { appendAdditionalParamsToUrl } from './common';
import Constants from '../constants';

const getFormattedPaymentId = (
  merchantReference: string,
  referenceId: number,
) => `${merchantReference}-${referenceId.toString()}`;

export function getServicePayload(
  customConfig: CustomObjects,
  reference: { referenceId: number },
  cart: Cart,
  payload: ICreateMyPaymentPayload,
) {
  const { hostedTokenizationId, acceptHeader, userAgent } = payload;
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

  const returnUrl = appendAdditionalParamsToUrl(payload.returnUrl, {
    orderPaymentId: paymentId,
  });

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

export function getDatabasePayload({
  customConfig,
  reference,
  cart,
  payload,
  payment,
  isHostedCheckout,
  isHostedTokenization,
}: {
  customConfig: CustomObjects;
  reference: { referenceId: number };
  cart: Cart;
  payload: { storeId: string };
  payment?: { id: string };
  isHostedCheckout?: boolean;
  isHostedTokenization?: boolean;
}) {
  const { merchantReference, authorizationMode } = customConfig;
  const cartId = cart.id;
  const { storeId } = payload;

  let paymentOption = null;

  if (isHostedCheckout) {
    paymentOption = Constants.getRedirectWorldlineOption();
  }
  if (isHostedTokenization) {
    paymentOption = Constants.getHostedAndAPMOption();
  }

  // Concat with the merchant reference
  const paymentId = getFormattedPaymentId(
    merchantReference,
    reference.referenceId,
  );

  return {
    authMode: authorizationMode as $Enums.Modes,
    paymentOption: paymentOption as $Enums.PaymentOptions,
    paymentId,
    worldlineId: payment?.id?.toString() || '',
    storeId,
    cartId,
    orderId: '',
    storePermanently: false, // TODO: will confirm
  };
}

export async function getCreatedPaymentMappedResponse(
  customConfig: CustomObjects,
  reference: { referenceId: number },
  payment: ICreatePaymentResponse,
  dbPayment: { id: string },
) {
  const { merchantReference } = customConfig;

  // Concat with the merchant reference
  const orderPaymentId = getFormattedPaymentId(
    merchantReference,
    reference.referenceId,
  );
  const {
    id: worldlineId = '',
    actionType = '',
    redirectURL = '',
  } = payment || {};

  const { id = '' } = dbPayment || {};

  return {
    id,
    worldlineId,
    orderPaymentId,
    actionType,
    redirectURL,
  };
}
