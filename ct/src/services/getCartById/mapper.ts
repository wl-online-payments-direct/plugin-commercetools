import { Cart } from '@commercetools/platform-sdk';
import { ICart } from './types';

const mapper = (response: ICart): Cart => {
  if (response?.body?.errors) {
    throw {
      message: '[CT] Failed to retrieve cart information',
      details: response?.body?.errors,
      statusCode: 400,
    };
  }

  return response.body?.data?.cart;
};

export default mapper;
