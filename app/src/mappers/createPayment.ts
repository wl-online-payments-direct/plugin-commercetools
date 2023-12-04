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
  const { hostedTokenizationId, returnUrl, acceptHeader, userAgent } = payload;
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
  const locale = cart.locale || 'en_US';

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
          acceptHeader,
          locale,
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
