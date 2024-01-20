// Make sure to import the helper functions from the `ssr` entry point.
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

//consider both serverside and clientside rendering to get entrypoint variable.
export const entryPointUriPath = typeof window === 'undefined'
  ? process.env.APPLICATION_ENTRY_POINT
  : window.app.entryPointUriPath;

export const myAccountUri = 'myaccount';

export const paymentMethodsUri = '';

export const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);
