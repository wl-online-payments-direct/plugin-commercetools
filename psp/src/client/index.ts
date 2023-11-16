import WorldLineSDK from "onlinepayments-sdk-nodejs";

const connectService = async (props: any) => {
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
