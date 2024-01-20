import { PERMISSIONS, entryPointUriPath, myAccountUri, paymentMethodsUri } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Worldline',
  entryPointUriPath,
  cloudIdentifier: '${env:CTP_MC_CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: '${env:CTP_MC_PROJECT_ID}',
    },
    production: {
      applicationId: '${env:CTP_MC_APPLICATION_ID}',
      url: 'https://${env:CTP_MC_APPLICATION_URL}',
      projectKey: '${env:CTP_MC_PROJECT_ID}'
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
