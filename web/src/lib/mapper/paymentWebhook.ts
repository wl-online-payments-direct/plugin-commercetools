import { Request, WebhookPayload } from '../types';

export function getOrderPaymentPayload(request: Request): WebhookPayload {
  const {
    payment: {
      id,
      status,
      paymentOutput: {
        amountOfMoney: { amount, currencyCode },
        references: { merchantReference },
      },
    },
  } = request.body;

  return {
    id,
    status,
    merchantReference,
    amount,
    currencyCode,
  };
}
