import { Cart, InventoryEntry } from '@worldline/ctintegration-ct';

export const hasDefaultInventoryMode = (cart: Cart) =>
  cart?.inventoryMode === 'None';

export const getCartSkus = (cart: Cart) => {
  const skus = cart.lineItems.map((item) => `"${item.variant.sku}"`);
  return skus.join(',');
};

export const hasInventoryExists = (
  cart: Cart,
  inventory: { results: InventoryEntry[] },
) =>
  cart.lineItems.every((lineItem) => {
    // Match sku and supplyChannel for cart and inventory
    const inv = inventory?.results?.find(
      (item) =>
        item.sku === lineItem.variant.sku &&
        item.supplyChannel?.id === lineItem.supplyChannel?.id,
    ) || { availableQuantity: 0 };
    // if it less than cart stock => return false
    return !(inv?.availableQuantity < lineItem.quantity);
  });

export const returnInventoryResponse = (hasInventory: boolean) => ({
  hasInventory,
});
