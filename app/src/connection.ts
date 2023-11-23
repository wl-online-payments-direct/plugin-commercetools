import { testConnectionService } from '@worldline/psp-integration';
import { ConnectionProps } from './types/connection';

export async function testConnection(options: ConnectionProps) {
  // Verify the connection
  return testConnectionService(options);
}
