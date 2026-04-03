import { testConnectionService } from '@worldline/ctintegration-psp';
import { decrypt } from '@worldline/ctintegration-util';
import { ConnectionProps } from './types/connection';

export async function testConnection(options: ConnectionProps) {
  // Decrypt sensitive fields if they are encrypted
  const decryptedOptions = {
    ...options,
    apiKey: decrypt(options.apiKey),
    apiSecret: decrypt(options.apiSecret),
  };

  // Verify the connection
  return testConnectionService(decryptedOptions);
}
