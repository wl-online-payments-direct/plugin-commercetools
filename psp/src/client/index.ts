import WorldLineSDK from 'onlinepayments-sdk-nodejs';
import { logger } from '@worldline/ctintegration-util';
import { ConnectOpts } from '../types';

const connectService = async (props: ConnectOpts) => {
  const { integrator, apiKey, apiSecret, host, enableLogs } = props;
  const enableLogging = enableLogs || process.env.ENABLE_PSP_LOGS === 'true';

  return WorldLineSDK.init({
    integrator, // used for identification in logs
    host, // Note: Use the endpoint without the /v2/ part here.
    logger: logger(),
    enableLogging,
    apiKeyId: apiKey,
    secretApiKey: apiSecret,
  });
};

export { connectService };
