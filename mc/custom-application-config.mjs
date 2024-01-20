import { PERMISSIONS, entryPointUriPath, myAccountUri, paymentMethodsUri } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Worldline',
  entryPointUriPath,
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: '${env:PROJECT_ID}',
    },
    production: {
      applicationId: '${env:APPLICATION_ID}',
      url: 'https://${env:APPLICATION_URL}',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Worldline Online Payments',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View, PERMISSIONS.Manage],
  },
  submenuLinks: [
    {
      uriPath: myAccountUri,
      defaultLabel: 'My Accounts',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View, PERMISSIONS.Manage],
    },
    {
      uriPath: paymentMethodsUri,
      defaultLabel: 'Payment Methods',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View, PERMISSIONS.Manage],
    },
  ],
};

export default config;
