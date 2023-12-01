import { CustomObjects } from '../services/getCustomObjects/types';
import connect from './connect';

const CT_PREFIX = 'CT';
const CT_PREFIX_CUSTOM_OBJECTS = `${CT_PREFIX}:customObjects`;

export const setCustomObjectsCache = async (
  storeId: string,
  value: CustomObjects,
) => {
  const cacheClient = await connect();
  const stringifyValue = JSON.stringify(value);
  const cacheKey = `${CT_PREFIX_CUSTOM_OBJECTS}:${storeId}`;
  await cacheClient.set(cacheKey, stringifyValue);
};

export const getCustomObjectsCache = async (storeId: string) => {
  const cacheClient = await connect();
  const cacheKey = `${CT_PREFIX_CUSTOM_OBJECTS}:${storeId}`;
  const stringifyValue = await cacheClient.get(cacheKey);
  const parsedValue = stringifyValue ? JSON.parse(stringifyValue) : '';
  return parsedValue;
};

export default {
  setCustomObjectsCache,
  getCustomObjectsCache,
};
