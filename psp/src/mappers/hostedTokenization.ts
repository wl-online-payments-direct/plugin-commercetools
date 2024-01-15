import {
  HostedTokenizationResponse,
  HostedTokenizationServiceResponse,
} from '../types';

export async function getFormattedHostedTokenizationResult(
  body: HostedTokenizationServiceResponse,
): Promise<HostedTokenizationResponse> {
  const { hostedTokenizationUrl = '', hostedTokenizationId = '' } = body || {};

  return { hostedTokenizationId, hostedTokenizationUrl };
}
