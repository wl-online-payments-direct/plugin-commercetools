import * as WorldlineActions from './actionControllers/PaymentController';
import { ExtensionRegistry } from '@frontastic/extension-types';

export default {
  actions: {
    payment: WorldlineActions,
  },
} as ExtensionRegistry;
