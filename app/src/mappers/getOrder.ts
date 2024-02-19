import { GetOrderPayload, PaymentPayload } from '../types';

export function getOrderDBPayload(payload: GetOrderPayload) {
  const { paymentId = '' } = payload || {};
  return { paymentId };
}

export function getOrderResponseMapper(payload: PaymentPayload['payment']) {
  const {
    id: worldlineId,
    status,
    statusOutput: { statusCode = 0 },
    paymentOutput: {
      paymentMethod = '',
      references: { merchantReference: paymentId = '' },
      amountOfMoney: { amount = 0, currencyCode = '' },
      cardPaymentMethodSpecificOutput: {
        card: { cardNumber = '', bin = '' },
        fraudResults = {},
        threeDSecureResults: { liability = '', authenticationStatus = '' },
      },
    },
  } = payload || {};

  return {
    worldlineId,
    paymentId,
    paymentMethod,
    status,
    statusCode,
    amount,
    currencyCode,
    card: {
      cardNumber,
      bin,
    },
    fraudResults,
    threeDSecureResults: {
      liability,
      authenticationStatus,
    },
  };
}
