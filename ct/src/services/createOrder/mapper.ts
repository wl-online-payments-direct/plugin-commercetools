import { Order } from '@commercetools/platform-sdk';

const mapper = (response: any): Order => {
  if (response?.body?.errors) {
    throw {
      message: '[CT] Failed to create order',
      details: response?.body?.errors,
      statusCode: 500,
    };
  }

  return response.body?.data?.order;
};

export default mapper;
