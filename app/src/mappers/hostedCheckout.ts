import { Cart } from '@worldline/ctintegration-ct';
import { CustomObjects, HostedCheckoutPayload } from '../types';

export function getHostedCheckoutPayload(
  customConfig: CustomObjects,
  cart: Cart,
  payload: HostedCheckoutPayload,
) {
  const amount = cart?.taxedPrice?.totalGross.centAmount || 0;
  const currencyCode = cart?.taxedPrice?.totalGross.currencyCode || '';
  const merchantCustomerId = cart?.customerId || cart?.anonymousId || '';
  const locale = cart?.locale || 'en-US';
  const countryCode = cart?.billingAddress?.country || '';

  const { variant } = customConfig;
  const { tokens } = payload;

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
    },
    hostedCheckoutSpecificInput: {
      variant,
      locale,
      tokens,
    },
  };
}
