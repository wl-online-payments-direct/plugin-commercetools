import WorldLineSDK from 'onlinepayments-sdk-nodejs';
import { logger } from '@worldline/ctintegration-util';
import { ConnectOpts } from '../types';
import { author, dependencies } from '../../package.json';
import Constants from '../constants';

const { PLUGIN_META_INFO } = Constants;

const connectService = async (props: ConnectOpts) => {
  const { integrator, apiKey, apiSecret, host, enableLogs } = props;
  const enableLogging = enableLogs || process.env.ENABLE_LOGS === 'true';

  return WorldLineSDK.init({
    integrator, // used for identification in logs
    host, // Note: Use the endpoint without the /v2/ part here.
    logger: logger(),
    enableLogging,
    apiKeyId: apiKey,
    secretApiKey: apiSecret,
  });
};

const getExtraHeaders = (props: ConnectOpts) => {
  const { integrator } = props;
  const xCustomHeaderValue = {
    sdkCreator: author,
    sdkIdentifier: dependencies['onlinepayments-sdk-nodejs'],
    platformIdentifier: `${process.platform} Node.js/${process.versions.node}`,
    integrator,
  };
  return [
    {
      key: PLUGIN_META_INFO.CUSTOM_HEADER_KEY,
      value: Buffer.from(JSON.stringify(xCustomHeaderValue)).toString('base64'),
    },
  ];
};

export { connectService, getExtraHeaders };
