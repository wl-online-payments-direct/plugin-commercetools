import { hasErrorDueConcurrentModification } from './common';

import { UpdateCart } from '../types';

const updateCartResponseMapper = (response: UpdateCart) => {
  const hasErrDueConcurrentModification =
    hasErrorDueConcurrentModification(response);

  const shouldThrowErrors =
    !!response?.body?.errors?.length && !hasErrDueConcurrentModification;

  if (shouldThrowErrors) {
    throw {
      message: '[CT] Failed to retrieve cart information',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  return {
    hasErrDueConcurrentModification,
    updatedCart: response?.body?.data?.updateCart,
  };
};

export { updateCartResponseMapper };
