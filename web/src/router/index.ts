import healthController from '../api/health/controller';
import testConnectionController from '../api/testConnection/controller';
import hostedTokenizationController from '../api/hostedTokenization/controller';
import createMyPaymentController from '../api/createMyPayment/controller';
import myHostedTokenizationController from '../api/myHostedTokenization/controller';
import createPaymentController from '../api/createPayment/controller';
import getPaymentStatusController from '../api/getPaymentStatus/controller';
import listOrdersController from '../api/listOrders/controller';
import validateMyCartController from '../api/validateMyCart/controller';
import validateCartController from '../api/validateCart/controller';
import webhookController from '../api/webhook/controller';
import retryPaymentController from '../api/retryPayment/controller';
import deleteMyTokenController from '../api/deleteMyToken/controller';
import loadMyPaymentMethodsController from '../api/loadMyPaymentMethods/controller';
import loadPaymentMethodsController from '../api/loadPaymentMethods/controller';
import getMyWebhookStatusController from '../api/getMyWebhookStatus/controller';
import hostedCheckoutController from '../api/hostedCheckout/controller';
import hostedMyCheckoutController from '../api/hostedMyCheckout/controller';
import getWebhookStatusController from '../api/getWebhookStatus/controller';
import capturePaymentController from '../api/capturePayment/controller';
import cancelPaymentController from '../api/cancelPayment/controller';
import refundPaymentController from '../api/refundPayment/controller';
import uploadImageController from '../api/uploadImage/controller';
import getPaymentProductsController from '../api/getPaymentProducts/controller';
import getOrderController from '../api/getOrder/controller';
import getMyCardsController from '../api/getMyCards/controller';
import sendEmailController from '../api/sendEmail/controller';
import getCardsController from '../api/getCards/controller';
import downloadLogController from '../api/downloadLog/controller';
import deleteTokenController from '../api/deleteToken/controller';

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
  '/me/token/remove': deleteMyTokenController.processRequest,
  '/me/payment/methods': loadMyPaymentMethodsController.processRequest,
  '/me/cards': getMyCardsController.processRequest,
  '/send/email': sendEmailController.processRequest,
  '/cards': getCardsController.processRequest,
  '/token/remove': deleteTokenController.processRequest,

  // Using frontastic token
  '/payment/methods': loadPaymentMethodsController.processRequest,
  '/initiate/hostedtokenization': hostedTokenizationController.processRequest,
  '/cart/validate': validateCartController.processRequest,
  '/initiate/hostedcheckout': hostedCheckoutController.processRequest,
  '/payment': createPaymentController.processRequest,
  '/webhook/status': getWebhookStatusController.processRequest,

  /* Merchant Center API */
  '/upload/images': uploadImageController.processRequest,
  '/payment/products': getPaymentProductsController.processRequest,
  '/orders': listOrdersController.processRequest,
  '/order': getOrderController.processRequest,
  '/download/log': downloadLogController.processRequest,
};

export { routes };
