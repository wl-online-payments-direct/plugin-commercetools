import { getCustomObjects } from '@worldline/ctintegration-ct';
import { deleteTokenService } from '@worldline/ctintegration-psp';
import {
  deleteCustomerPaymentTokens,
  getCustomerPaymentToken,
} from '@worldline/ctintegration-db';
import { logger } from '@worldline/ctintegration-util';
import { DeleteTokenPayload } from './types';
import {
  getConnectionServiceProps,
  getConditionByToken,
  getDeletedTokenMappedResponse,
} from './mappers';

export async function deleteTokenAppHandler(payload: DeleteTokenPayload) {
  const customerPaymentToken = await getCustomerPaymentToken(
    getConditionByToken(payload),
  );
  if (!customerPaymentToken) {
    throw {
      message: `Failed to fetch the payment for token: '${payload.token}'`,
      statusCode: 500,
    };
  }

  // Remove database token
  const hasDBTokenDeleted = await deleteCustomerPaymentTokens(
    getConditionByToken(payload),
  );
  logger.debug('Processed deletion for customer tokens in database');

  // Remove psp token
  const hasPspTokenDeleted = await deleteTokenService(
    getConnectionServiceProps(await getCustomObjects(payload.storeId)),
    payload.token,
  );
  logger.debug('Processed deletion for customer tokens in psp');

  return getDeletedTokenMappedResponse(hasDBTokenDeleted, hasPspTokenDeleted);
}
