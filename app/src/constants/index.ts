const WORLDLINE_CREDITCARD = 'WORLDLINE_CREDITCARD';
const HOSTED_AND_APMS = 'HOSTED_AND_APMS';
const REDIRECT_WORLDLINE = 'REDIRECT_WORLDLINE';

export default {
  CART: {
    ACTIVE: 'Active',
  },
  PAYMENT: {
    REDIRECTMODE_A: {
      TYPE: 'offsite',
    },
    REDIRECTMODE_B: {
      TYPE: 'offsite',
      PAYMENT_METHOD: 'worldlineOffsite',
    },
    ONSITEMODE: {
      TYPE: 'onsite',
      PAYMENT_METHOD: 'worldlineOnsite',
    },
    DATABASE: {
      STATUS: {
        FAILED: 'FAILED',
      },
      STATE: {
        DEFAULT: 'DEFAULT',
        PROCESSING: 'PROCESSING',
      },
      PAYMENT_OPTIONS: {
        WORLDLINE_CREDITCARD,
        HOSTED_AND_APMS,
        REDIRECT_WORLDLINE,
      },
    },
  },
  STATUS: {
    PENDING_CAPTURE: 'payment.pending_capture',
  },
  getWordlineCreditCardOption() {
    return WORLDLINE_CREDITCARD;
  },
  getHostedAndAPMOption() {
    return HOSTED_AND_APMS;
  },
  getRedirectWorldlineOption() {
    return REDIRECT_WORLDLINE;
  },
  getPaymentOptions() {
    return [WORLDLINE_CREDITCARD, HOSTED_AND_APMS, REDIRECT_WORLDLINE];
  },
};
