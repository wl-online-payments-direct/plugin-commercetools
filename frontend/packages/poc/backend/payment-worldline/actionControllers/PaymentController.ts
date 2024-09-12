import { ActionContext, Request, Response } from '@frontastic/extension-types';
import PaymentApi from '../apis/PaymentApi';
import { getCurrency, getLocale } from '@Commerce-commercetools/utils/Request';

type ActionHook = (request: Request, actionContext: ActionContext) => Promise<Response>;

function getPaymentApi(request: Request, actionContext: ActionContext) {
  return new PaymentApi(actionContext.frontasticContext, getLocale(request), getCurrency(request));
}

export const getPaymentMethods: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const {
    sessionData: { cartId },
  } = request;
  const { result } = await paymentApi.paymentMethods(cartId);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

export const getHostedCheckout: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const {
    sessionData: { cartId },
    body,
  } = request;
  const payload = JSON.parse(body);
  const hostedCheckout = await paymentApi.hostedCheckout(cartId, payload);
  return {
    statusCode: 200,
    body: JSON.stringify(hostedCheckout),
  };
};

export const getWebhookStatus: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const {
    sessionData: { cartId },
    query: { paymentId },
  } = request;
  const data = await paymentApi.webhookStatus(cartId, paymentId);
  const { result } = data;
  if (result) {
    const { status } = result;
    if (status === 'CAPTURED' || status === 'AUTHORIZED') {
      delete request.sessionData.cartId;
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    sessionData: {
      ...request.sessionData,
    },
  };
};

export const getPaymentStatus: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const {
    sessionData: { cartId },
    query: { paymentId },
  } = request;
  const data = await paymentApi.paymentStatus(cartId, paymentId);
  const { result } = data;
  if (result) {
    const { status } = result;
    if (status === 'CAPTURED' || status === 'AUTHORIZED') {
      delete request.sessionData.cartId;
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    sessionData: {
      ...request.sessionData,
    },
  };
};

export const getHostedTokenization: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const {
    sessionData: { cartId },
    body,
  } = request;
  const { cardToken = '', device } = JSON.parse(body);
  const data = await paymentApi.hostedTokenization(cartId, cardToken, device);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const validateCart: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const {
    sessionData: { cartId },
  } = request;
  const data = await paymentApi.validateCart(cartId);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const createPayment: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const {
    sessionData: { cartId },
    body,
  } = request;
  const { device, data: bodyData } = JSON.parse(body);
  const data = await paymentApi.createPayment(cartId, bodyData, device);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const deleteSavedCard: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const { body } = request;
  const response = await paymentApi.deleteSavedCard(JSON.parse(body));
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const savedCards: ActionHook = async (request: Request, actionContext: ActionContext) => {
  const paymentApi = getPaymentApi(request, actionContext);
  const { body } = request;
  const { customerEmail } = JSON.parse(body);
  const data = await paymentApi.savedCards(customerEmail);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
