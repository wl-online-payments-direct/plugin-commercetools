import healthController from "../api/health/controller";
import testConnectionController from "../api/testConnection/controller";

const routes = {
  "/": healthController.processRequest,
  "/health": healthController.processRequest,
  "/connection": testConnectionController.processRequest,
};

export { routes };
