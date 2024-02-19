import { GetHostedTokenizationResponse } from '../types';

export function getHostedTokenizationResponseMapper(
  payload: GetHostedTokenizationResponse,
) {
  if (payload.token) {
    return { isTemporary: payload?.token?.isTemporary };
  }
  return { isTemporary: true };
}
