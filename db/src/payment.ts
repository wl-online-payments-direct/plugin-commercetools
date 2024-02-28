import { Prisma } from '@prisma/client';
import { logger } from '@worldline/ctintegration-util';
import prisma from './connection';
import {
  createPaymentResponseMapper,
  getIncrementedReferenceMapper,
  retry,
} from './mapper';
import type {
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetOrders,
  Payment,
  PaymentQueryParams,
  Status,
} from './types';

export async function getDBOrders(
  query: PaymentQueryParams,
): Promise<GetOrders> {
  try {
    // Prepare
    const page = query.page || 1;
    const limit = query.limit || 20;

    const skip = (page - 1) * limit;
    const params = {
      where: {
        ...(query.orderId ? { orderId: query.orderId } : {}),
        ...(query.storeId ? { storeId: query.storeId } : {}),
        ...((query.filterOption
          ? { paymentOption: query.filterOption }
          : {}) as Prisma.paymentsWhereUniqueInput),
      },
    };
    const [totalCount, data] = await Promise.all([
      prisma.payments.count(params),
      prisma.payments.findMany({
        skip,
        take: limit,
        ...params,
      }),
    ]);
    return {
      meta: {
        ...query,
        ...{ page },
        ...{ limit },
        totalCount,
      },
      data,
    };
  } catch (error) {
    logger().error(`Failed to fetch orders list: ${JSON.stringify(error)}`);

    throw {
      message: 'Failed to fetch orders list',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

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

export async function getPayment(where: {
  [key: string]: string;
}): Promise<Payment | null> {
  try {
    const payment = await prisma.payments.findFirst({
      where: where as unknown as Prisma.paymentsWhereUniqueInput,
    });
    return payment;
  } catch (error) {
    throw {
      message: 'Exception occured for fetching the payment',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function setPayment(
  where: { [key: string]: string | number },
  data: { [key: string]: string | number | boolean },
): Promise<Payment> {
  try {
    const result = await prisma.payments.update({
      where: where as unknown as Prisma.paymentsWhereUniqueInput,
      data,
    });
    return result;
  } catch (error) {
    throw {
      message: 'Failed to update payment',
      statusCode: 500,
      details: (error as { message: string }).message,
    };
  }
}

export async function getPaymentsByStatus(
  storeId: string,
  statuses: Status[],
  isSendNotification: boolean = false,
): Promise<Payment[]> {
  try {
    const whereClause: {
      storeId: string;
      status: {
        in: Status[];
      };
      isSendNotification?: boolean;
    } = {
      storeId,
      status: {
        in: statuses,
      },
    };

    if (isSendNotification !== undefined) {
      whereClause.isSendNotification = isSendNotification;
    }

    const payments = await prisma.payments.findMany({
      where: whereClause,
    });

    return payments;
  } catch (error) {
    throw {
      message: 'Exception occurred while fetching the payments',
      statusCode: 500,
      details: (error as Error).message,
    };
  }
}
