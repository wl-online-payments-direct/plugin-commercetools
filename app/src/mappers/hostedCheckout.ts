import { Cart } from '@worldline/ctintegration-ct';
import { CustomObjects, HostedCheckoutPayload } from '../types';

export function getHostedCheckoutPayload(
  customConfig: CustomObjects,
  reference: { referenceId: number },
  cart: Cart,
  payload: HostedCheckoutPayload,
) {
  const amount = cart?.taxedPrice?.totalGross.centAmount || 0;
  const currencyCode = cart?.taxedPrice?.totalGross.currencyCode || '';
  const merchantCustomerId = cart?.customerId || cart?.anonymousId || '';
  const locale = cart?.locale || 'en-US';
  const countryCode = cart?.billingAddress?.country || '';

  const { variant, merchantReference } = customConfig;
  const { tokens } = payload;

  // Concat with the merchant reference
  const paymentId = `${merchantReference}-${reference?.referenceId?.toString()}`;

  return {
    order: {
      amountOfMoney: {
        currencyCode,
        amount,
      },
      customer: {
        merchantCustomerId,
        billingAddress: {
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
      locale,
      tokens,
    },
  };
}
