import {
  PERMISSIONS,
  myAccountUri,
  orderUri,
  paymentMethodsUri,
} from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Worldline',
  entryPointUriPath: '${env:CTP_MC_APPLICATION_ENTRY_POINT}',
  cloudIdentifier: '${env:CTP_MC_CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: 'worldline',
    },
    production: {
      applicationId: '${env:CTP_MC_APPLICATION_ID}',
      url: 'https://${env:CTP_MC_APPLICATION_URL}',
    },
  },
  headers: {
    csp: {
      'connect-src': [
        '${env.CTP_MC_APPLICATION_API_HOST}',
        '${env.CTP_MC_APPLICATION_MC_API_HOST}',
      ],
    },
  },
  oAuthScopes: {
    view: [
      'view_products',
      'view_orders',
      'view_customers',
      'view_key_value_documents',
      'view_stores',
      'view_project_settings',
    ],
    manage: [
      'manage_products',
      'manage_orders',
      'manage_customers',
      'manage_key_value_documents',
    ],
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
    {
      uriPath: orderUri,
      defaultLabel: 'Orders',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View, PERMISSIONS.Manage],
    },
  ],
  additionalEnv: {
    apiHost: '${env:CTP_MC_APPLICATION_API_HOST}',
    signUpLink: '${env:CTP_MC_APPLICATION_SIGN_UP}',
    documentationLink: '${env:CTP_MC_APPLICATION_DOCUMENTATION}',
    contactSalesLink: '${env:CTP_MC_APPLICATION_CONTACT_SALES}',
    contactSupportLink: '${env:CTP_MC_APPLICATION_CONTACT_SUPPORT}',
    readMeLink: '${env:CTP_MC_APPLICATION_README}',
    pluginVersion: '${env:CTP_MC_APPLICATION_PLUGIN_VERSION}',
    pluginVersionLink: '${env:CTP_MC_APPLICATION_PLUGIN_VERSION_LINK}',
    sourcePackageLink: '${env:CTP_MC_APPLICATION_SOURCE_PACKAGE_LINK}',
    currentVersion: '${env:CTP_MC_APPLICATION_CURRENT_VERSION}',
    pluginDownloadLink: '${env:CTP_MC_APPLICATION_PLUGIN_DOWNLOAD_LINK}',
  },
};

export default config;
