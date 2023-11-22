import WorldLineSDK from 'onlinepayments-sdk-nodejs';
import { ConnectOpts } from '../types';

const connectService = async (props: ConnectOpts) => {
  const { integrator, apiKey, apiSecret, host } = props;
  return WorldLineSDK.init({
    integrator, // used for identification in logs
    host, // Note: Use the endpoint without the /v2/ part here.
    enableLogging: true,
    apiKeyId: apiKey,
    secretApiKey: apiSecret,
  });
};

export { connectService };
