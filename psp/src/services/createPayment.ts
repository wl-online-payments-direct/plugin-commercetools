import { connectService } from "../client";
import {
  CreatePaymentPayload,
  CreatePaymentResponse,
  ConnectOpts,
} from "../types";

export async function createPaymentService(
  connectOpts: ConnectOpts,
  payload: CreatePaymentPayload
): Promise<CreatePaymentResponse> {
  try {
    const { merchantId } = connectOpts;
    const client = await connectService(connectOpts);
    const result = await client.payments.createPayment(
      merchantId,
      payload,
      {}
    );

    if (result.body?.errors) {
      throw {
        message: "Failed to process the create payment service",
        statusCode: result.body.status,
        details: result.body?.errors,
      };
    }

    const { id, status } = result.body;
    return { id, status };
  } catch (error) {
    throw error;
  }
}
