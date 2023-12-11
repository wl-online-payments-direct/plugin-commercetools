import { orderPaymentHandler } from '@worldline/ctintegration-app';
import { Request } from './types';
import { getOrderPaymentPayload } from './mapper';

export async function webhook(request: Request) {
  // Pass webhook request to the app
  return orderPaymentHandler(getOrderPaymentPayload(request));
}
