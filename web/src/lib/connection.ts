import { testConnection } from "@worldline/app-integration";
import { ConnectionProps } from "./types/connection";

export async function testConnectionRequest(options: ConnectionProps) {
  try {
    const result = await testConnection(options);
    return result;
  } catch (error) {
    throw error;
  }
}
