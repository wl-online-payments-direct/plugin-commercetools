import { Cart } from '@worldline/ctintegration-ct';
import { $Enums } from '@worldline/ctintegration-db';
import {
  CustomObjects,
  GetHostedTokenizationResponse,
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
  const {
    hostedTokenizationId,
    acceptHeader,
    userAgent,
    device: { timezoneOffsetUtcMinutes, browserData },
  } = payload;
  const { authorizationMode, merchantReference, onSiteMode } = customConfig;
  // Concat with the merchant reference
  const paymentId = getFormattedPaymentId(
    merchantReference,
    reference.referenceId,
  );

  const amount = cart?.taxedPrice?.totalGross.centAmount || 0;
  const currencyCode = cart?.taxedPrice?.totalGross.currencyCode || '';
  const merchantCustomerId = cart?.customerId || cart?.anonymousId || '';
  const locale = cart?.locale ? { locale: cart.locale } : {};

  const returnUrl = appendAdditionalParamsToUrl(payload.returnUrl, {
    orderPaymentId: paymentId,
  });

  let challengeIndicator: string | undefined;
  let exemptionRequest: string | undefined;

  if (onSiteMode['3dsChallenge']) {
    if (amount < 30 && onSiteMode['3dsExemption']) {
      exemptionRequest = process.env.EXEMPTION_REQUEST;
    } else {
      challengeIndicator = process.env.CHALLENGE_INDICATOR;
    }
  } else if (onSiteMode['3dsExemption']) {
    if (amount < 30) {
      exemptionRequest = process.env.EXEMPTION_REQUEST;
    }
  }

  return {
    hostedTokenizationId,
    cardPaymentMethodSpecificInput: {
      authorizationMode,
      threeDSecure: {
        skipAuthentication: !onSiteMode['3dsEnablement'],
        challengeIndicator,
        exemptionRequest,
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
          timezoneOffsetUtcMinutes,
          browserData,
        },
      },
      references: {
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
  hostedTokenizationResponse,
}: {
  customConfig: CustomObjects;
  reference: { referenceId: number };
  cart: Cart;
  payload: { storeId: string; hostedTokenizationId?: string };
  payment?: {
    id: string;
    status?: string;
    statusCode?: number;
    amount?: number;
    currencyCode?: string;
  };
  isHostedCheckout?: boolean;
  isHostedTokenization?: boolean;
  hostedTokenizationResponse?: GetHostedTokenizationResponse;
}) {
  const { merchantReference, authorizationMode } = customConfig;
  const cartId = cart.id;
  const { storeId, hostedTokenizationId } = payload;

  const {
    id: worldlineId = '',
    status: worldlineStatus = '',
    statusCode: worldlineStatusCode = 0,
    amount: total = 0,
    currencyCode: currency = '',
  } = payment || {};

  let paymentOption;

  if (isHostedCheckout) {
    paymentOption = Constants.getRedirectWorldlineOption();
  }
  if (isHostedTokenization) {
    paymentOption = Constants.getWordlineCreditCardOption();
  }

  // Concat with the merchant reference
  const paymentId = getFormattedPaymentId(
    merchantReference,
    reference.referenceId,
  );

  const storePermanently = !hostedTokenizationResponse?.token?.isTemporary;

  return {
    authMode: authorizationMode as $Enums.Modes,
    paymentOption: paymentOption as $Enums.PaymentOptions,
    paymentId,
    storeId,
    cartId,
    orderId: '',
    hostedTokenizationId,
    storePermanently,
    worldlineId,
    worldlineStatus,
    worldlineStatusCode,
    currency,
    total,
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

export function getHostedTokenizationPayload(payload: ICreateMyPaymentPayload) {
  const { storeId, hostedTokenizationId } = payload;
  return {
    storeId,
    hostedTokenizationId,
  };
}
