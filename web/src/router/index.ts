import healthController from '../api/health/controller';
import testConnectionController from '../api/testConnection/controller';
import hostedTokenizationController from '../api/hostedTokenization/controller';
import createMyPaymentController from '../api/createMyPayment/controller';
import myHostedTokenizationController from '../api/myHostedTokenization/controller';
import createPaymentController from '../api/createPayment/controller';
import getPaymentStatusController from '../api/getPaymentStatus/controller';
import validateMyCartController from '../api/validateMyCart/controller';
import validateCartController from '../api/validateCart/controller';
import webhookController from '../api/webhook/controller';
import retryPaymentController from '../api/retryPayment/controller';
import deleteTokenController from '../api/deleteToken/controller';
import loadMyPaymentMethodsController from '../api/loadMyPaymentMethods/controller';
import loadPaymentMethodsController from '../api/loadPaymentMethods/controller';
import getMyWebhookStatusController from '../api/getMyWebhookStatus/controller';
import hostedCheckoutController from '../api/hostedCheckout/controller';
import hostedMyCheckoutController from '../api/hostedMyCheckout/controller';
import getWebhookStatusController from '../api/getWebhookStatus/controller';
import capturePaymentController from '../api/capturePayment/controller';
import cancelPaymentController from '../api/cancelPayment/controller';
import refundPaymentController from '../api/refundPayment/controller';

const routes = {
  '/': healthController.processRequest,
  '/health': healthController.processRequest,
  '/testconnection': testConnectionController.processRequest,
  '/me/initiate/hostedtokenization':
    myHostedTokenizationController.processRequest,
  '/me/initiate/hostedcheckout': hostedMyCheckoutController.processRequest,
  '/me/payment': createMyPaymentController.processRequest,
  '/payment/status': getPaymentStatusController.processRequest,
  '/me/cart/validate': validateMyCartController.processRequest,
  '/webhook': webhookController.processRequest,
  '/me/webhook/status': getMyWebhookStatusController.processRequest,
  '/payment/retry': retryPaymentController.processRequest,
  '/payment/capture': capturePaymentController.processRequest,
  '/payment/cancel': cancelPaymentController.processRequest,
  '/payment/refund': refundPaymentController.processRequest,
  '/token/remove': deleteTokenController.processRequest,
  '/me/payment/methods': loadMyPaymentMethodsController.processRequest,

  // Using frontastic token
  '/payment/methods': loadPaymentMethodsController.processRequest,
  '/initiate/hostedtokenization': hostedTokenizationController.processRequest,
  '/cart/validate': validateCartController.processRequest,
  '/initiate/hostedcheckout': hostedCheckoutController.processRequest,
  '/payment': createPaymentController.processRequest,
  '/webhook/status': getWebhookStatusController.processRequest,
};

export { routes };
