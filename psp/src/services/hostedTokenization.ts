import { connectService } from "../client";
import {
  HostedTokenizationPayload,
  HostedTokenizationResponse,
  ConnectOpts,
} from "../types";

export async function hostedTokenizationService(
  connectOpts: ConnectOpts,
  payload: HostedTokenizationPayload
): Promise<HostedTokenizationResponse> {
  try {
    const { merchantId } = connectOpts;
    const client = await connectService(connectOpts);
    const result = await client.hostedTokenization.createHostedTokenization(
      merchantId,
      payload,
      {}
    );

    if (result.body?.errors) {
      throw {
        message: "Failed to process the hosted tokenization service",
        statusCode: result.body.status,
        details: result.body?.errors,
      };
    }

    const { hostedTokenizationUrl } = result.body;
    return { hostedTokenizationUrl };
  } catch (error) {
    throw error;
  }
}
