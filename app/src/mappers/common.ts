import { Cart, Order, Payment } from '@worldline/ctintegration-ct';
import Constants from '../constants';

export const appendAdditionalParamsToUrl = (
  url: string,
  additionalParams: { [key: string]: string },
) => {
  const formattedUrl = new URL(url);
  Object.keys(additionalParams).forEach((key) => {
    if (additionalParams[key]) {
      formattedUrl.searchParams.append(key, additionalParams[key]);
    }
  });
  return formattedUrl?.href;
};

export const camelCase = (str: string) =>
  str
    ?.toLowerCase()
    ?.replace(
      /[^a-zA-Z0-9]+(.)/g,
      (_m: string, chr: string) => chr?.toUpperCase(),
    );

export function isCartActive(cart: Cart) {
  return cart.cartState === Constants.CART.ACTIVE;
}

export function getupdateOrderWithPaymentMapper(
  payment: Payment,
  order: Order,
) {
  const { id, version, createdAt } = order;
  return {
    order: {
      id,
      version,
      createdAt,
    },
    payment,
  };
}

export function getOrderResultMapper(order: { id: string; createdAt: string }) {
  return {
    orderId: order.id,
    orderCreatedAt: order.createdAt,
  };
}

export function process3Ds(
  amount: number,
  threeDSChallenge: boolean,
  threeDSExemption: boolean,
) {
  let exemptionRequest: string | undefined;
  let challengeIndicator: string | undefined;

  const { CHALLENGE_INDICATOR, EXEMPTION_REQUEST } = Constants.THREE_DS;
  if (threeDSChallenge) {
    if (amount < Constants.CART.MINIMUM_AMOUNT_CENTS && threeDSExemption) {
      exemptionRequest = EXEMPTION_REQUEST;
    } else {
      challengeIndicator = CHALLENGE_INDICATOR;
    }
  } else if (threeDSExemption) {
    if (amount < Constants.CART.MINIMUM_AMOUNT_CENTS) {
      exemptionRequest = EXEMPTION_REQUEST;
    }
  }

  return { challengeIndicator, exemptionRequest };
}

export const getFormattedDate = (dateOfBirth: string | undefined) => {
  if (!dateOfBirth) {
    return '';
  }
  const date = new Date(dateOfBirth);
  return date.toLocaleDateString('en-GB').split('/').reverse().join('');
};
