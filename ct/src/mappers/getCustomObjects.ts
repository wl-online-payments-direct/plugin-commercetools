import { decrypt } from '@worldline/ctintegration-util';
import { CustomObjects, CustomObjectsResponse } from '../types';

/**
 * Decrypt sensitive fields in CustomObjects
 */
function decryptConfigFields(config: CustomObjects): CustomObjects {
  return {
    ...config,
    apiKey: decrypt(config.apiKey),
    apiSecret: decrypt(config.apiSecret),
    webhookKey: decrypt(config.webhookKey),
    webhookSecret: decrypt(config.webhookSecret),
  };
}

const getCustomObjectsResponseMapper = (
  response: CustomObjectsResponse,
): CustomObjects => {
  if (response?.body?.errors) {
    throw {
      message: '[CT] Failed to retrieve custom object information',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  const result = response?.body?.data?.customObject || {};

  if (!result?.value) {
    throw {
      message: '[CT] Failed to fetch the custom object',
      statusCode: 500,
    };
  }

  const { mode, live, test, ...rest } = result.value;
  const connectionProps = mode === 'live' ? live : test;
  const config = {
    mode,
    ...connectionProps,
    ...rest,
  } as CustomObjects;
  
  return decryptConfigFields(config);
};

export { getCustomObjectsResponseMapper };
