import {
  initiatePaymentSession,
  createPayment,
} from "@worldline/ctintegration-app";
import { Request } from "~/types";

export async function initiatePaymentRequest(request: Request) {
  try {
    const {
      projectId,
      storeId,
      cartId,
      tokens,
      askConsumerConsent = true, // Default will be true
    } = request.body;

    // if (!projectId || !storeId || !cartId || !tokens) {
    //   throw {
    //     message: "Required parameters are missing or empty",
    //     statusCode: 400,
    //   };
    // }

    const { authorization: authToken } = request.headers;

    if (!authToken) {
      throw {
        message: "Authentication parameters are missing or empty",
        statusCode: 403,
      };
    }

    // Perform a payment request to psp
    const options = {
      authToken,
      projectId,
      storeId,
      cartId,
      tokens,
      askConsumerConsent,
    };
    const result = await initiatePaymentSession(options);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function createPaymentRequest(request: Request) {
  try {
    const { projectId, storeId } = request.body;

    if (!projectId || !storeId ) {
      throw {
        message: "Required parameters are missing or empty",
        statusCode: 400,
      };
    }

    const { authorization: authToken } = request.headers;

    if (!authToken) {
      throw {
        message: "Authentication parameters are missing or empty",
        statusCode: 403,
      };
    }

    // Perform create payment request to psp
    const options = {
      authToken,
      projectId,
      storeId,
    };
    
    const result = await createPayment(options);

    return result;
  } catch (error) {
    throw error;
  }
}
