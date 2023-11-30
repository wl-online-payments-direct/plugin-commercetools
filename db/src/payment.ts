import { Prisma } from '@prisma/client';
import prisma from './connection';
import { incrementedPaymentIdMapper } from './mapper';
import { Payment } from './types';

export async function createPaymentInDB(
  data: Prisma.paymentsCreateInput,
): Promise<Payment> {
  try {
    const result = await prisma.payments.create({ data });
    return result;
  } catch (error) {
    throw {
      message: 'Failed to create payment',
      statusCode: 400,
      details: (error as { message: string }).message,
    };
  }
}

export async function getIncrementedPaymentId(): Promise<{
  incrementedPaymentId: number;
}> {
  try {
    const lastPayment = await prisma.payments.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return incrementedPaymentIdMapper(lastPayment);
  } catch (error) {
    throw {
      message: 'Failed to increment the payment id',
      statusCode: 400,
      details: (error as { message: string }).message,
    };
  }
}

export async function getPayment(
  where: Prisma.paymentsWhereInput,
): Promise<Payment> {
  try {
    const payment = await prisma.payments.findFirst({
      where,
    });
    if (!payment) {
      throw new Error('Failed to fetch the payment');
    }
    return payment;
  } catch (error) {
    throw {
      message: 'Exception occured for fetching the payment',
      statusCode: 400,
      details: (error as { message: string }).message,
    };
  }
}

export async function setPayment(
  where: Prisma.paymentsWhereUniqueInput,
  data: { [key: string]: string },
): Promise<Payment> {
  try {
    const result = await prisma.payments.update({
      where,
      data,
    });
    return result;
  } catch (error) {
    throw {
      message: 'Failed to update payment',
      statusCode: 400,
      details: (error as { message: string }).message,
    };
  }
}
