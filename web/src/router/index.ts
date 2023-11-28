import healthController from '../api/health/controller';
import testConnectionController from '../api/testConnection/controller';
import initiatePaymentController from '../api/initiatePayment/controller';
import createPaymentController from '../api/createPayment/controller';
import getPaymentStatusController from '../api/getPaymentStatus/controller';
import webhookController from '../api/webhook/controller';

const routes = {
  '/': healthController.processRequest,
  '/health': healthController.processRequest,
  '/connection': testConnectionController.processRequest,
  '/initiatePayment': initiatePaymentController.processRequest,
  '/payment': createPaymentController.processRequest,
  '/getPaymentStatus': getPaymentStatusController.processRequest,
  '/webhook': webhookController.processRequest,
};

export { routes };
