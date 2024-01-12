import healthController from '../api/health/controller';
import testConnectionController from '../api/testConnection/controller';
import initiatePaymentController from '../api/initiatePayment/controller';
import createPaymentController from '../api/createPayment/controller';
import getPaymentStatusController from '../api/getPaymentStatus/controller';
import validateCartController from '../api/validateCart/controller';
import webhookController from '../api/webhook/controller';
import retryPaymentController from '../api/retryPayment/controller';
import getWebhookStatusController from '../api/getWebhookStatus/controller';

const routes = {
  '/': healthController.processRequest,
  '/health': healthController.processRequest,
  '/testconnection': testConnectionController.processRequest,
  '/initiate/payment': initiatePaymentController.processRequest,
  '/payment': createPaymentController.processRequest,
  '/payment/status': getPaymentStatusController.processRequest,
  '/cart/validate': validateCartController.processRequest,
  '/webhook': webhookController.processRequest,
  '/webhook/status': getWebhookStatusController.processRequest,
  '/payment/retry': retryPaymentController.processRequest,
};

export { routes };
