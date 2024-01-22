import healthController from '../api/health/controller';
import testConnectionController from '../api/testConnection/controller';
import hostedTokenizationController from '../api/hostedTokenization/controller';
import createMyPaymentController from '../api/createMyPayment/controller';
import createPaymentController from '../api/createPayment/controller';
import getPaymentStatusController from '../api/getPaymentStatus/controller';
import validateCartController from '../api/validateCart/controller';
import webhookController from '../api/webhook/controller';
import retryPaymentController from '../api/retryPayment/controller';
import deleteTokenController from '../api/deleteToken/controller';
import loadPaymentMethodsController from '../api/loadPaymentMethods/controller';
import getWebhookStatusController from '../api/getWebhookStatus/controller';
import hostedCheckoutController from '../api/hostedCheckout/controller';

const routes = {
  '/': healthController.processRequest,
  '/health': healthController.processRequest,
  '/testconnection': testConnectionController.processRequest,
  '/me/initiate/hostedtokenization':
    hostedTokenizationController.processRequest,
  '/me/initiate/hostedcheckout': hostedCheckoutController.processRequest,
  '/me/payment': createMyPaymentController.processRequest,
  '/payment': createPaymentController.processRequest,
  '/payment/status': getPaymentStatusController.processRequest,
  '/me/cart/validate': validateCartController.processRequest,
  '/webhook': webhookController.processRequest,
  '/me/webhook/status': getWebhookStatusController.processRequest,
  '/payment/retry': retryPaymentController.processRequest,
  '/token/remove': deleteTokenController.processRequest,
  '/me/payment/methods': loadPaymentMethodsController.processRequest,
};

export { routes };
