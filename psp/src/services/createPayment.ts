import { getCreatePaymentMappedResponse } from '../mappers';
import { connectService } from '../client';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  CreatedPaymentServiceResponse,
  ConnectOpts,
} from '../types';

export async function createPaymentService(
  connectOpts: ConnectOpts,
  payload: CreatePaymentRequest,
): Promise<CreatePaymentResponse> {
  const { merchantId } = connectOpts;
  const client = await connectService(connectOpts);
  const result = (await client.payments.createPayment(
    merchantId,
    payload,
    {},
  )) as CreatedPaymentServiceResponse;

  const noResult = !result?.body || result?.body?.errors;
  if (noResult) {
    throw {
      message: 'Failed to process the create payment service',
      statusCode: result.body?.errors[0]?.httpStatusCode || 500,
      details: result.body?.errors,
    };
  }

  return getCreatePaymentMappedResponse(result);
}
