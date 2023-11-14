import healthController from "../api/health/controller";
import saveConfigController from "../api/saveConfig/controller";

const routes = {
  "/": healthController.processRequest,
  "/health": healthController.processRequest,
  "/saveConfig": saveConfigController.processRequest,
};

export { routes };
