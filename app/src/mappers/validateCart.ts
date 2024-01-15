import { Cart } from '@worldline/ctintegration-ct';

export const hasDefaultInventoryMode = (cart: Cart) => {
  const inventoryMode = cart?.inventoryMode === 'None';
  const lineItemsInventoryMode = cart?.lineItems?.every(
    (lineItem) =>
      lineItem?.inventoryMode === 'None' || lineItem?.inventoryMode === null,
  );
  return inventoryMode && lineItemsInventoryMode;
};

export const getCartSkus = (cart: Cart) => {
  const skus = cart.lineItems.map((item) => `"${item.variant.sku}"`);
  return skus.join(',');
};

export const returnInventoryResponse = (hasInventory: boolean) => ({
  hasInventory,
});
