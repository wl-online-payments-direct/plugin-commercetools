import { Cart } from '@worldline/ctintegration-ct';
import { CustomObjects, HostedCheckoutPayload } from '../types';
import { appendAdditionalParamsToUrl } from './common';

export function getHostedCheckoutPayload(
  customConfig: CustomObjects,
  reference: { referenceId: number },
  cart: Cart,
  payload: HostedCheckoutPayload,
) {
  const amount = cart?.taxedPrice?.totalGross.centAmount || 0;
  const currencyCode = cart?.taxedPrice?.totalGross.currencyCode || '';
  const merchantCustomerId = cart?.customerId || cart?.anonymousId || '';
  const locale = cart?.locale ? { locale: cart.locale } : {};

  const { variant, merchantReference } = customConfig;
  const { tokens, acceptHeader, userAgent } = payload;

  // Billing address
  const {
    apartment = '',
    building = '',
    streetName = '',
    streetNumber = '',
    additionalAddressInfo: additionalInfo = 'NA',
    country: countryCode = '',
    city = '',
    state = '',
    postalCode: zip = '',
  } = cart?.billingAddress || {};

  // Concat with the merchant reference
  const paymentId = `${merchantReference}-${reference?.referenceId?.toString()}`;

  const returnUrl = appendAdditionalParamsToUrl(payload.returnUrl, {
    orderPaymentId: paymentId,
  });

  return {
    order: {
      amountOfMoney: {
        currencyCode,
        amount,
      },
      customer: {
        merchantCustomerId,
        device: {
          ...locale,
          acceptHeader,
          userAgent,
        },
        billingAddress: {
          houseNumber: `${apartment} ${building}`,
          city,
          state,
          street: `${streetNumber} ${streetName}`,
          zip,
          additionalInfo,
          countryCode,
        },
      },
      references: {
        // this key is used to identify the merchant from webhook
        merchantReference: paymentId,
      },
    },
    hostedCheckoutSpecificInput: {
      variant,
      ...locale,
      tokens,
      returnUrl,
    },
  };
}
