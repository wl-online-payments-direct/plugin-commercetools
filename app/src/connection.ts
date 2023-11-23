import { testConnectionService } from "@worldline/ctintegration-psp";
import { ConnectionProps } from "./types/connection";

export async function testConnection(options: ConnectionProps) {
  // Verify the connection
  return await testConnectionService(options);
}
