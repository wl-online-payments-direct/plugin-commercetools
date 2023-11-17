import { initiatePaymentSession } from "@worldline/app-integration";
import { InitiatePayment } from "./types";

export async function initiatePaymentRequest(options: InitiatePayment) {
  try {
    const result = await initiatePaymentSession(options);
    return result;
  } catch (error) {
    throw error;
  }
}
