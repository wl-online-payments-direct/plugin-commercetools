const WORLDLINE_CREDITCARD = 'WORLDLINE_CREDITCARD';
const HOSTED_AND_APMS = 'HOSTED_AND_APMS';
const REDIRECT_WORLDLINE = 'REDIRECT_WORLDLINE';

export default {
  getWorldlineEmailID() {
    return 'isvpartners@worldline.com';
  },
  CRON: {
    manually: 'manually',
    endOfDay: 'endOfDay',
    afterOneDay: 'afterOneDay',
    afterTwoDay: 'afterTwoDay',
    afterThreeDay: 'afterThreeDay',
    afterFourDay: 'afterFourDay',
    afterFiveDay: 'afterFiveDay',
    afterSixDay: 'afterSixDay',
    afterSevenDay: 'afterSevenDay',
  },
  CART: {
    ACTIVE: 'Active',
    MINIMUM_AMOUNT_CENTS: 3000,
  },
  TRANSACTION: {
    CHARGE: 'Charge',
    REFUND: 'Refund',
    CANCEL_AUTHORIZATION: 'CancelAuthorization',
    PAID: 'Paid',
  },
  ORDER: {
    CONFIRMED: 'Confirmed',
    COMPLETE: 'Complete',
    CANCELLED: 'Cancelled',
  },
  PAYMENT: {
    REDIRECTMODE_A: {
      TYPE: 'offsite',
      PAYMENT_OPTIONS: {
        MOBILE: 'mobile',
        REDIRECT: 'redirect',
        CARD: 'card',
      },
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
        IN_REVIEW: 'IN_REVIEW',
        PARTIALLY_CAPTURED: 'PARTIALLY_CAPTURED',
        PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED',
        PARTIALLY_CANCELLED: 'PARTIALLY_CANCELLED',
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
    CAPTURED: 'payment.captured',
    CAPTURE_REQUESTED: 'payment.capture_requested',
  },
  THREE_DS: {
    CHALLENGE_INDICATOR: 'challenge-required',
    EXEMPTION_REQUEST: 'lowvalue',
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
  getDownloadFileName() {
    return `worldline-log-${Date.now()}.log`;
  },
  HTML: {
    EMAIL_TEMPLATE: `<table border=1>
    <thead>
      <tr>
        <th>PSP Id</th>
        <th>Company Name</th>
        <th>Message</th>
        <th>Platform Version</th>
        <th>Plugin Version</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{pspId}</td>
        <td>{companyName}</td>
        <td>{message}</td>
        <td>{pluginVersion}</td>
      </tr>
    </tbody>
  </table>`,
    PAYMENT_TEMPLATE: `<table border=1>
    <thead>
      <tr>
        <th>Payment Id</th>
        <th>WorldLine Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <!-- Dynamically generated table body will be inserted here -->
      {tableBody}
    </tbody>
  </table>
`,
  },
};
