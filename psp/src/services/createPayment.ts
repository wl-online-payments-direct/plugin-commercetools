import { getCreatePaymentMappedResponse } from '../mappers';
import { connectService, getExtraHeaders } from '../client';
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
  const result = (await client.payments.createPayment(merchantId, payload, {
    extraHeaders: getExtraHeaders(connectOpts),
  })) as CreatedPaymentServiceResponse;

  if (result?.body?.errors) {
    throw {
      message: 'Failed to process the create payment service',
      statusCode: result.body.errors[0]?.httpStatusCode || 500,
      details: result.body.errors,
    };
  }

  return getCreatePaymentMappedResponse(result);
}
