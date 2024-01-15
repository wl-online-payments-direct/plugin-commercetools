import {
  getMyCart,
  getInventory,
  recalculateCart,
  Cart,
  InventoryEntry,
} from '@worldline/ctintegration-ct';
import { ValidateCartPayload } from './types';
import {
  getCartSkus,
  hasDefaultInventoryMode,
  returnInventoryResponse,
} from './mappers/validateCart';

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

export async function validateCart(payload: ValidateCartPayload) {
  // Fetch customer cart from Commercetools
  const { cart } = await getMyCart(payload.authToken);

  // check cart inventoryMode and lineItems inventoryMode is 'none'
  if (hasDefaultInventoryMode(cart)) {
    return returnInventoryResponse(true);
  }

  const inventory = await getInventory(payload.authToken, getCartSkus(cart));
  if (!inventory.exists) {
    return returnInventoryResponse(false);
  }

  const hasInventory = hasInventoryExists(cart, inventory);

  // Recalculate cart
  const recalculatedCart = await recalculateCart(payload.authToken, cart);

  if (!recalculatedCart.id) {
    return returnInventoryResponse(false);
  }

  return returnInventoryResponse(hasInventory);
}
