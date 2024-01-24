import healthController from '../api/health/controller';
import testConnectionController from '../api/testConnection/controller';
import hostedTokenizationController from '../api/hostedTokenization/controller';
import createMyPaymentController from '../api/createMyPayment/controller';
import myHostedTokenizationController from '../api/myHostedTokenization/controller';
import createPaymentController from '../api/createPayment/controller';
import getPaymentStatusController from '../api/getPaymentStatus/controller';
import validateCartController from '../api/validateCart/controller';
import webhookController from '../api/webhook/controller';
import retryPaymentController from '../api/retryPayment/controller';
import deleteTokenController from '../api/deleteToken/controller';
import loadMyPaymentMethodsController from '../api/loadMyPaymentMethods/controller';
import loadPaymentMethodsController from '../api/loadPaymentMethods/controller';
import getWebhookStatusController from '../api/getWebhookStatus/controller';
import hostedCheckoutController from '../api/hostedCheckout/controller';
import hostedMyCheckoutController from '../api/hostedMyCheckout/controller';

const routes = {
  '/': healthController.processRequest,
  '/health': healthController.processRequest,
  '/testconnection': testConnectionController.processRequest,
  '/me/initiate/hostedtokenization':
    myHostedTokenizationController.processRequest,
  '/me/initiate/hostedcheckout': hostedMyCheckoutController.processRequest,
  '/me/payment': createMyPaymentController.processRequest,
  '/payment/status': getPaymentStatusController.processRequest,
  '/me/cart/validate': validateCartController.processRequest,
  '/webhook': webhookController.processRequest,
  '/me/webhook/status': getWebhookStatusController.processRequest,
  '/payment/retry': retryPaymentController.processRequest,
  '/token/remove': deleteTokenController.processRequest,
  '/me/payment/methods': loadMyPaymentMethodsController.processRequest,

  // Using frontastic token
  '/payment/methods': loadPaymentMethodsController.processRequest,
  '/initiate/hostedtokenization': hostedTokenizationController.processRequest,
  '/initiate/hostedcheckout': hostedCheckoutController.processRequest,
  '/payment': createPaymentController.processRequest,
};

export { routes };
