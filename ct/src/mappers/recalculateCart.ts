import { RecalculateCartResponse } from '../types';

const recalculateCartResponseMapper = (response: RecalculateCartResponse) =>
  response?.body?.data?.updateCart || null;

export { recalculateCartResponseMapper };
