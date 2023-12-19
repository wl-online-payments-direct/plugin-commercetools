import { InventoryEntry, ErrorObject } from '@commercetools/platform-sdk';

export interface GetInventoryResponse {
  body: {
    data: {
      inventoryEntries: {
        total: number;
        count: number;
        exists: boolean;
        results: InventoryEntry[];
      };
    };
    errors: ErrorObject[];
  };
}
