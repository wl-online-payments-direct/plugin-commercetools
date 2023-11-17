import connect from "./connect";

const CT_PREFIX = "CT";
const KEY_CUSTOM_OBJECT = `${CT_PREFIX}:customObjects`;

export const setCustomObjectsCache = async (value: any) => {
  const cacheClient = await connect();
  const stringifyValue = JSON.stringify(value);
  await cacheClient.set(KEY_CUSTOM_OBJECT, stringifyValue);
};

export const getCustomObjectsCache = async () => {
  const cacheClient = await connect();
  const stringifyValue = await cacheClient.get(KEY_CUSTOM_OBJECT);
  const parsedValue = stringifyValue ? JSON.parse(stringifyValue) : "";
  return parsedValue;
};

export default {
  setCustomObjectsCache,
  getCustomObjectsCache,
};
