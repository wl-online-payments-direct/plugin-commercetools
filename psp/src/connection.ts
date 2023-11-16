import { connectService } from "./client";
import { ConnectionProps } from "./types";

export async function testConnectionService(options: ConnectionProps) {
  try {
    const { merchantId } = options;
    const client = await connectService(options);
    const { isSuccess, body } = await client.services.testConnection(
      merchantId,
      {}
    );

    if (body?.errors) {
      throw {
        message: "Failed to process the test connection",
        statusCode: body.status,
        details: body?.errors,
      };
    }

    return isSuccess;
  } catch (error) {
    throw error;
  }
}
