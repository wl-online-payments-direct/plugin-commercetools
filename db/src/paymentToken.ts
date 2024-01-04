import prisma from './connection';
import { CreateCustomerPaymentTokenRequest } from './types';

export async function saveCustomerPaymentToken(
  data: CreateCustomerPaymentTokenRequest,
) {
  try {
    return await prisma.customer_payment_tokens.create({ data });
  } catch (error) {
    throw {
      message: 'Exception occured for save customer payment token',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function getCustomerPaymentToken(token: string) {
  try {
    return await prisma.customer_payment_tokens.findFirst({
      where: {
        token,
      },
    });
  } catch (error) {
    throw {
      message: 'Exception occured for fetching the customer payment token',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function deleteCustomerPaymentTokens(token: string) {
  try {
    return await prisma.customer_payment_tokens.deleteMany({
      where: {
        token,
      },
    });
  } catch (error) {
    throw {
      message: 'Exception occured for delete the customer payment token',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}
