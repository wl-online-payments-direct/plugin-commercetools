import healthController from '../api/health/controller';
import testConnectionController from '../api/testConnection/controller';
import initiatePaymentController from '../api/initiatePayment/controller';
import createPaymentController from '../api/createPayment/controller';
import getPaymentStatusController from '../api/getPaymentStatus/controller';
import validateCartController from '../api/validateCart/controller';

const routes = {
  '/': healthController.processRequest,
  '/health': healthController.processRequest,
  '/testconnection': testConnectionController.processRequest,
  '/initiate/payment': initiatePaymentController.processRequest,
  '/payment': createPaymentController.processRequest,
  '/payment/status': getPaymentStatusController.processRequest,
  '/validateCart': validateCartController.processRequest,
};

export { routes };
