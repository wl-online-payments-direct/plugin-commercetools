import { logger } from '@worldline/ctintegration-util';
import prisma from './connection';
import { CreateCustomerPaymentTokenRequest } from './types';

export async function saveCustomerPaymentToken(
  data: CreateCustomerPaymentTokenRequest,
) {
  try {
    return prisma.customer_payment_tokens.create({ data });
  } catch (error) {
    logger().debug(
      `Exception occured for save customer payment token: ${JSON.stringify(
        error,
      )}`,
    );
    throw {
      message: 'Exception occured for save customer payment token',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function getCustomerPaymentToken(id: string) {
  try {
    return prisma.customer_payment_tokens.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    logger().debug(
      `Exception occured for fetching the customer payment token: ${JSON.stringify(
        error,
      )}`,
    );
    throw {
      message: 'Exception occured for fetching the customer payment token',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function deleteCustomerPaymentTokens(id: string) {
  try {
    return prisma.customer_payment_tokens.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    logger().debug(
      `Exception occured for delete the customer payment token: ${JSON.stringify(
        error,
      )}`,
    );
    throw {
      message: 'Exception occured for delete the customer payment token',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function getPaymentTokensByCustomerID(customerId: string) {
  try {
    return await prisma.customer_payment_tokens.findMany({
      where: {
        customerId,
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
