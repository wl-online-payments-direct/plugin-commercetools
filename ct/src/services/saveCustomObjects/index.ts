import { ApiClient } from '../../clients';
import mutation from './mutation';
import { encrypt, isEncrypted } from '@worldline/ctintegration-util';
import Constants from '../../constants';

export interface SaveCustomObjectPayload {
  key: string;
  value: {
    mode: string;
    live?: Record<string, unknown>;
    test?: Record<string, unknown>;
    [key: string]: unknown;
  };
}

export interface SaveCustomObjectResponse {
  body: {
    data: {
      createOrUpdateCustomObject: {
        id: string;
        version: number;
        key: string;
        container: string;
        value: unknown;
      };
    };
    errors?: Array<{ message: string }>;
  };
}

const SENSITIVE_FIELDS = ['apiKey', 'apiSecret', 'webhookKey', 'webhookSecret'];


function encryptFields(config: Record<string, unknown>): Record<string, unknown> {
  const result = { ...config };
  for (const field of SENSITIVE_FIELDS) {
    if (field in result && typeof result[field] === 'string') {
      const value = result[field] as string;
      if (!isEncrypted(value)) {
        result[field] = encrypt(value);
      }
    }
  }
  return result;
}

function encryptConfigurationValue(
  value: SaveCustomObjectPayload['value'],
): SaveCustomObjectPayload['value'] {
  const result = { ...value };

  if (result.live && typeof result.live === 'object') {
    result.live = encryptFields(result.live as Record<string, unknown>);
  }

  if (result.test && typeof result.test === 'object') {
    result.test = encryptFields(result.test as Record<string, unknown>);
  }

  return result;
}

export async function saveCustomObjects(
  payload: SaveCustomObjectPayload,
): Promise<SaveCustomObjectResponse> {
  const apiClient = new ApiClient();

  const encryptedValue = encryptConfigurationValue(payload.value);

  const variables = {
    draft: {
      container: Constants.CUSTOM_OBJECT.CONTAINER_NAME,
      key: payload.key,
      value: JSON.stringify(encryptedValue),
    },
  };

  apiClient.setBody({
    query: mutation,
    variables,
  });

  const response = (await apiClient.execute()) as SaveCustomObjectResponse;

  if (response?.body?.errors?.length) {
    throw {
      message: '[CT] Failed to save custom object',
      details: response.body.errors,
      statusCode: 500,
    };
  }

  return response;
}
