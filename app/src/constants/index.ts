const WORLDLINE_CREDITCARD = 'WORLDLINE_CREDITCARD';
const HOSTED_AND_APMS = 'HOSTED_AND_APMS';
const REDIRECT_WORLDLINE = 'REDIRECT_WORLDLINE';

export default {
  CRON: {
    manually: 'Manually',
    endOfDay: 'At the end of the day',
    afterOneDay: 'After 1 day',
    afterTwoDay: 'After 2 days',
    afterThreeDay: 'After 3 days',
    afterFourDay: 'After 4 days',
    afterFiveDay: 'After 5 days',
    afterSixDay: 'After 6 days',
    afterSevenDay: 'After 7 days',
  },
  CART: {
    ACTIVE: 'Active',
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
        <td>{platformVersion}</td>
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
