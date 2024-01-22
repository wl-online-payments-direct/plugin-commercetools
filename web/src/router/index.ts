import healthController from '../api/health/controller';
import testConnectionController from '../api/testConnection/controller';
import hostedTokenizationController from '../api/hostedTokenization/controller';
import createPaymentController from '../api/createPayment/controller';
import getPaymentStatusController from '../api/getPaymentStatus/controller';
import validateMyCartController from '../api/validateMyCart/controller';
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
  '/initiate/hostedtokenization': hostedTokenizationController.processRequest,
  '/initiate/hostedcheckout': hostedCheckoutController.processRequest,
  '/payment': createPaymentController.processRequest,
  '/payment/status': getPaymentStatusController.processRequest,
  '/me/cart/validate': validateMyCartController.processRequest,
  '/cart/validate': validateCartController.processRequest,
  '/webhook': webhookController.processRequest,
  '/webhook/status': getWebhookStatusController.processRequest,
  '/payment/retry': retryPaymentController.processRequest,
  '/token/remove': deleteTokenController.processRequest,
  '/payment/methods': loadPaymentMethodsController.processRequest,
};

export { routes };
