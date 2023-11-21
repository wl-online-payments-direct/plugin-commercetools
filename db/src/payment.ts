import prisma from "./connection";
import { createPaymentResponseMapper } from "./mapper/payment";
import type {
  CreatePaymentRequest,
  CreatePaymentResponse,
} from "./types/payment";

export async function createPaymentInDB(
  data: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    const result = await prisma.payments.create({ data });
    return createPaymentResponseMapper(result);
  } catch (error: any) {
    throw { message: error?.message, statusCode: 400 };
  }
}
