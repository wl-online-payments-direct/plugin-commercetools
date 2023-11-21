import { connectService } from "../client";
import { ConnectOpts } from "../types";

export async function getPaymentStatusService(
  connectOpts: ConnectOpts,
  paymentId: string
): Promise<{ status: string }> {
  try {
    const { merchantId } = connectOpts;
    const client = await connectService(connectOpts);
    const result = await client.payments.getPayment(merchantId, paymentId, {});
    if (result.body?.errors) {
      throw {
        message: "Failed to process the get payment status service",
        statusCode: result.body.status,
        details: result.body?.errors,
      };
    }

    const { status } = result.body;

    return { status };
  } catch (error) {
    throw error;
  }
}
