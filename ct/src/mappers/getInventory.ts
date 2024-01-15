import { GetInventoryResponse } from '../types';

const getInventoryResponseMapper = (response: GetInventoryResponse) =>
  response?.body?.data?.inventoryEntries || {
    total: 0,
    count: 0,
    exists: false,
    results: [],
  };

export { getInventoryResponseMapper };
