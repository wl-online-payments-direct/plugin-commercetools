export default {
  PSP_NAME: 'Worldline',
  CUSTOM_OBJECT: {
    CONTAINER_NAME: 'worldline-configuration',
    AUTHORIZATION_MODE: {
      SALE: 'SALE',
    },
  },
  CREATE_PAYMENT: {
    TYPE_KEY: 'customPaymentData',
    FIELDS: {
      PAYMENTID: 'paymentId',
    },
  },
  ORDER: {
    PAYMENT_STATE: {
      PAID: 'Paid',
      PENDING: 'Pending',
    },
  },
};
