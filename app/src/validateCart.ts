import {
  getMyCart,
  getInventory,
  recalculateCart,
} from '@worldline/ctintegration-ct';
import { ValidateCartPayload } from './types';
import {
  getCartSkus,
  hasDefaultInventoryMode,
  hasInventoryExists,
  returnInventoryResponse,
} from './mappers/validateCart';

export async function validateCart(payload: ValidateCartPayload) {
  // Fetch customer cart from Commercetools
  const { cart } = await getMyCart(payload.authToken);

  // check cart inventoryMode == none
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
