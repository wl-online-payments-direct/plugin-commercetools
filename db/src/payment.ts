import prisma from "./connection";
import {
  createPaymentResponseMapper,
  incrementedPaymentIdMapper,
} from "./mapper";
import type { CreatePaymentRequest, CreatePaymentResponse } from "./types";

export async function createPaymentInDB(
  data: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    const result = await prisma.payments.create({ data });
    return createPaymentResponseMapper(result);
  } catch (error: any) {
    throw {
      message: "Failed to create payment",
      statusCode: 400,
      details: error?.message,
    };
  }
}

export async function getIncrementedPaymentId(): Promise<{
  incrementedPaymentId: number;
}> {
  try {
    const lastPayment = await prisma.payments.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    return incrementedPaymentIdMapper(lastPayment);
  } catch (error: any) {
    throw {
      message: "Failed to increment the payment id",
      statusCode: 400,
      details: error?.message,
    };
  }
}
