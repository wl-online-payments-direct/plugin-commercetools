import prisma from './connection';
import { CreateCustomerPaymentTokenRequest } from './types';

export async function saveCustomerPaymentToken(
  data: CreateCustomerPaymentTokenRequest,
) {
  try {
    const result = await prisma.customer_payment_tokens.create({ data });
    return result;
  } catch (error) {
    throw {
      message: 'Failed to create customer payment token',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}
