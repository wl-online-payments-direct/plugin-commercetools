import { getCustomObjects, getCustomer } from '@worldline/ctintegration-ct';
import { deleteTokenService } from '@worldline/ctintegration-psp';
import {
  deleteCustomerPaymentTokens,
  getCustomerPaymentToken,
} from '@worldline/ctintegration-db';
import { logger } from '@worldline/ctintegration-util';
import { DeleteTokenPayload } from './types';
import {
  getConnectionServiceProps,
  getDeletedTokenMappedResponse,
} from './mappers';

export async function deleteTokenAppHandler(payload: DeleteTokenPayload) {
  // Fetch cart from Commercetools to authenticate
  const customer = await getCustomer(payload.customerId, payload.customerEmail);

  const { customerPaymentTokenId } = payload;
  if (!customer) {
    throw {
      message: 'Failed to fetch the customer or customer is missing',
      statusCode: 500,
    };
  }

  const customerPaymentToken = await getCustomerPaymentToken(
    customerPaymentTokenId,
  );
  if (!customerPaymentToken) {
    throw {
      message: 'Failed to fetch the payment for token',
      statusCode: 500,
    };
  }

  // Remove psp token
  const hasPspTokenDeleted = await deleteTokenService(
    getConnectionServiceProps(await getCustomObjects(payload.storeId)),
    customerPaymentToken.token,
  );
  logger().debug('Processed deletion for customer tokens in psp');

  // Remove database token
  const hasDBTokenDeleted = await deleteCustomerPaymentTokens(
    customerPaymentTokenId,
  );

  logger().debug('Processed deletion for customer tokens in database');

  return getDeletedTokenMappedResponse(hasDBTokenDeleted, hasPspTokenDeleted);
}
