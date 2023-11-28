import { Request, WebhookPayload } from '../types';

export function getWebhookPayload(request: Request): WebhookPayload {
  const {
    payment: {
      id,
      paymentOutput: {
        amountOfMoney: { amount, currencyCode },
        references: { merchantReference },
      },
    },
  } = request.body;

  return {
    id,
    merchantReference,
    amount,
    currencyCode,
  };
}
