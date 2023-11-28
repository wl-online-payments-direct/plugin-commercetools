import { testConnection } from '@worldline/ctintegration-app';
import { ConnectionProps } from './types/connection';

export async function testConnectionRequest(options: ConnectionProps) {
  const result = await testConnection(options);
  return result;
}
