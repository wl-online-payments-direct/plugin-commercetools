import healthController from "../api/health/controller";
import testConnectionController from "../api/testConnection/controller";
import initiatePaymentController from "../api/initiatePayment/controller";

const routes = {
  "/": healthController.processRequest,
  "/health": healthController.processRequest,
  "/connection": testConnectionController.processRequest,
  "/initiatePayment": initiatePaymentController.processRequest,
};

export { routes };
