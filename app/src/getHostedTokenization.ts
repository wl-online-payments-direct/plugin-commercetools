import { getCustomObjects } from '@worldline/ctintegration-ct';
import { getHostedTokenizationService } from '@worldline/ctintegration-psp';
import { GetHostedTokenizationPayload } from './types';
import {
  getConnectionServiceProps,
  getHostedTokenizationResponseMapper,
} from './mappers';

export async function getHostedTokenization(
  payload: GetHostedTokenizationPayload,
) {
  const customConfig = await getCustomObjects(payload.storeId);

  if (!customConfig) {
    throw {
      message: 'Failed to fetch configuration',
      statusCode: 500,
    };
  }
  // Prepare service payload for get payment status
  const serviceResponse = await getHostedTokenizationService(
    getConnectionServiceProps(customConfig),
    payload.hostedTokenizationId,
  );

  return getHostedTokenizationResponseMapper(serviceResponse);
}
