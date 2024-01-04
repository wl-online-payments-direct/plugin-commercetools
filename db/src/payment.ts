import { Prisma } from '@prisma/client';
import prisma from './connection';
import {
  createPaymentResponseMapper,
  getIncrementedReferenceMapper,
  retry,
} from './mapper';
import type {
  CreatePaymentRequest,
  CreatePaymentResponse,
  Payment,
} from './types';

export async function createPaymentInDB(
  data: CreatePaymentRequest,
): Promise<CreatePaymentResponse> {
  try {
    const result = await prisma.payments.create({ data });
    return createPaymentResponseMapper(result);
  } catch (error) {
    throw {
      message: 'Failed to create payment',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function getIncrementedReference(storeId: string) {
  try {
    const INITIAL_REFERENCE = 100000;
    const INITIAL_VERSION = 1;

    return await retry(() =>
      prisma.$transaction(async (tx) => {
        try {
          const paymentReference = await tx.payment_references.findFirst({
            where: {
              storeId,
            },
          });

          if (!paymentReference) {
            const created = await tx.payment_references.create({
              data: {
                storeId,
                version: INITIAL_VERSION,
                referenceId: INITIAL_REFERENCE,
              },
            });
            return {
              isRetry: false,
              data: getIncrementedReferenceMapper(created),
            };
          }

          let { referenceId } = paymentReference;
          const { version } = paymentReference;

          referenceId += 1;

          const newversion = version + 1;

          const updated = await tx.payment_references.update({
            where: {
              id: paymentReference.id,
              storeId,
              version,
            },
            data: {
              referenceId,
              version: newversion,
            },
          });

          if (!updated) {
            return { isRetry: true };
          }

          return {
            isRetry: false,
            data: getIncrementedReferenceMapper(updated),
          };
        } catch (e) {
          const error = e as unknown as { code: string };
          return error?.code === 'P2025'
            ? { isRetry: true }
            : { isRetry: false };
        }
      }),
    );
  } catch (error) {
    throw {
      message: 'Failed to increment the payment id',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function getPayment(
  where: Prisma.paymentsWhereInput,
): Promise<Payment | null> {
  try {
    const payment = await prisma.payments.findFirst({
      where,
    });
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
