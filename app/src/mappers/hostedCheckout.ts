import { Cart, Customer } from '@worldline/ctintegration-ct';
import { CustomObjects, HostedMyCheckoutPayload } from '../types';
import {
  appendAdditionalParamsToUrl,
  getFormattedDate,
  process3Ds,
} from './common';
import Constants from '../constants';

type CartWithCustomer = Cart & { customer: Customer };

export function getHostedCheckoutPayload(
  customConfig: CustomObjects,
  reference: { referenceId: number },
  cart: Cart,
  payload: HostedMyCheckoutPayload,
) {
  const amount = cart?.totalPrice?.centAmount || 0;
  const currencyCode = cart?.totalPrice?.currencyCode || '';
  const merchantCustomerId = cart?.customerId || cart?.anonymousId || '';
  const locale = cart?.locale ? { locale: cart.locale } : {};

  const {
    merchantReference,
    redirectModeA,
    redirectModeB,
    authorizationMode,
    timeOut,
  } = customConfig;
  const { tokens, acceptHeader, userAgent, paymentProductId, paymentMethod } =
    payload;

  const selectedPaymentOption = redirectModeA.paymentOptions.find(
    (e) => e.paymentProductId === paymentProductId,
  );

  const paymentMethodType = selectedPaymentOption?.paymentMethodType;

  // Billing address
  const {
    apartment = '',
    building = '',
    streetName = '',
    streetNumber = '',
    additionalAddressInfo: additionalInfo = '',
    country: countryCode = '',
    city = '',
    state = '',
    postalCode: zip = '',
  } = cart?.billingAddress || {};

  // Shipping
  const { shippingAddress, taxedShippingPrice } = cart;
  const { customer } = cart as CartWithCustomer;

  const shipping = {
    address: {
      name: {
        firstName: shippingAddress?.firstName || customer?.firstName || '',
        surname: shippingAddress?.lastName || customer?.lastName || '',
      },
      houseNumber: `${shippingAddress?.apartment} ${shippingAddress?.building}`,
      zip: shippingAddress?.postalCode || '',
      city: shippingAddress?.city || '',
      countryCode: shippingAddress?.country || '',
      street: shippingAddress?.streetName || '',
    },
    shippingCost: taxedShippingPrice?.totalNet.centAmount,
    shippingCostTax: taxedShippingPrice?.totalTax?.centAmount,
  };

  const personalInformation = {
    name: {
      title: customer?.title,
      firstName: customer?.firstName || shippingAddress?.firstName || '',
      surname: customer?.lastName || shippingAddress?.lastName || '',
    },
    dateOfBirth: getFormattedDate(customer?.dateOfBirth),
  };

  // Line items
  const items = cart.lineItems.map((lineItem) => ({
    amountOfMoney: {
      currencyCode: lineItem?.totalPrice?.currencyCode,
      amount: lineItem?.totalPrice?.centAmount,
    },
    invoiceData: {
      description: (lineItem.productType as unknown as { description: string })
        .description,
    },
    orderLineDetails: {
      productName: lineItem.name as unknown, // Todo, will pass the all locale to cart to get the name
      discountAmount: 0, // Todo, getting an array of discount
      productCode: lineItem.productId,
      productPrice: lineItem.price.value.centAmount,
      productType: lineItem.productType.obj?.name,
      quantity: lineItem.quantity,
      // taxAmount: lineItem.taxRate?.amount,
    },
  }));
  // Concat with the merchant reference
  const paymentId = `${merchantReference}-${reference?.referenceId?.toString()}`;

  const returnUrl = appendAdditionalParamsToUrl(payload.returnUrl, {
    orderPaymentId: paymentId,
  });

  // Advanced Admin Settings:
  /* option to sent the shoppingCart.items array as part of payload */
  const sendOrderData = !!redirectModeA.sendOrderData;

  /* option to group all hosted checkout cards */
  const groupCards = !!redirectModeB?.groupCards;

  /* option to template for Hosted Checkout and Hosted Tokenization */
  let variant = redirectModeA?.templateFileName || '';
  let {
    '3dsEnablement': threeDSEnablement,
    '3dsChallenge': threeDSChallenge,
    '3dsExemption': threeDSExemption,
  } = redirectModeA;

  let skipAuthentication = !threeDSEnablement;
  const threeDSecure = {
    skipAuthentication,
    challengeIndicator: undefined as 'challenge-required' | undefined,
    exemptionRequest: undefined as 'lowvalue' | undefined,
  };

  let cardPaymentMethodSpecificInput = {};
  let redirectPaymentMethodSpecificInput = {};
  let sepaDirectDebitPaymentMethodSpecificInput = {};
  let mobilePaymentMethodSpecificInput = {};

  const { PAYMENT } = Constants;

  // Check if payment method is 'worldlineOffsite'
  if (paymentMethod === PAYMENT.REDIRECTMODE_B.PAYMENT_METHOD) {
    variant = redirectModeB?.templateFileName;
    threeDSEnablement = redirectModeB['3dsEnablement'];
    threeDSChallenge = redirectModeB['3dsChallenge'];
    threeDSExemption = redirectModeB['3dsExemption'];
    skipAuthentication = !threeDSEnablement;
  }

  const { challengeIndicator, exemptionRequest } = process3Ds(
    amount,
    threeDSChallenge,
    threeDSExemption,
  );

  threeDSecure.challengeIndicator = challengeIndicator as
    | 'challenge-required'
    | undefined;
  threeDSecure.exemptionRequest = exemptionRequest as 'lowvalue' | undefined;

  const paymentSettings = redirectModeA.paymentOptions.find(
    (paymentOption) => paymentOption.paymentProductId === paymentProductId,
  );
  const {
    recurrenceType = 'UNIQUE',
    signatureType = 'SMS',
    paymentOption = '',
  } = paymentSettings || {};

  /* 
  tokenize = true  : Checkbox will NOT be displayed.
  tokenize = false : Checkbox will be displayed.
  ie; for the loggedIn customer, tokenize will set as false
 */

  const tokenize = !cart?.customerId;

  const hostedCheckoutSpecificInput = {
    variant,
    ...locale,
    tokens,
    returnUrl,
    paymentProductFilters: {},
    cardPaymentMethodSpecificInput: {},
    sessionTimeout: timeOut,
  };

  if (paymentMethod === PAYMENT.REDIRECTMODE_B.PAYMENT_METHOD) {
    hostedCheckoutSpecificInput.cardPaymentMethodSpecificInput = {
      groupCards,
    };
  }

  if (paymentProductId) {
    switch (paymentProductId) {
      // Klarna
      case 3301:
      case 3302:
      case 3306:
        redirectPaymentMethodSpecificInput = {
          paymentProductId,
          requiresApproval: authorizationMode !== 'SALE',
        };
        break;
      // Oney
      case 5110:
        redirectPaymentMethodSpecificInput = {
          requiresApproval: false, // must be set as false, As oney only allow direct sale
          paymentProductId,
          paymentOption,
        };
        break;
      // Sepa Direct Debit
      case 771:
        hostedCheckoutSpecificInput.paymentProductFilters = {
          restrictTo: {
            products: [paymentProductId],
          },
        };
        sepaDirectDebitPaymentMethodSpecificInput = {
          paymentProduct771SpecificInput: {
            mandate: {
              returnUrl,
              // [TODO] Temp solution. commercetools customerId/anonymousId is not worked
              // WL team will revert this
              customerReference: `CustomerRef_${Date.now()}`,
              recurrenceType,
              signatureType,
            },
          },
        };
        break;
      // Multibanco
      case 5500:
        redirectPaymentMethodSpecificInput = {
          paymentProductId,
          requiresApproval: authorizationMode !== 'SALE',
        };
        break;
      // Applepay
      case 302:
        mobilePaymentMethodSpecificInput = {
          authorizationMode,
          paymentProductId,
        };
        break;
      // P24
      case 3124:
        redirectPaymentMethodSpecificInput = {
          paymentProductId,
          requiresApproval: authorizationMode !== 'SALE',
        };
        break;
      // EPS
      case 5406:
        redirectPaymentMethodSpecificInput = {
          paymentProductId,
          requiresApproval: authorizationMode !== 'SALE',
          redirectionData: {
            returnUrl,
          },
        };
        break;
      // Twint
      case 5407:
        redirectPaymentMethodSpecificInput = {
          paymentProductId,
          requiresApproval: authorizationMode !== 'SALE',
        };
        break;
      // Intersolve
      case 5700:
        cardPaymentMethodSpecificInput = {
          authorizationMode,
          paymentProductId,
          threeDSecure,
        };
        mobilePaymentMethodSpecificInput = {
          // Intersolve does not work with Authorization
          authorizationMode: 'SALE',
        };
        break;
      default:
        if (
          paymentMethodType === PAYMENT.REDIRECTMODE_A.PAYMENT_OPTIONS.MOBILE
        ) {
          mobilePaymentMethodSpecificInput = {
            paymentProductId,
          };
        }
        if (
          paymentMethodType === PAYMENT.REDIRECTMODE_A.PAYMENT_OPTIONS.REDIRECT
        ) {
          redirectPaymentMethodSpecificInput = {
            paymentProductId,
          };
        }
        if (paymentMethodType === PAYMENT.REDIRECTMODE_A.PAYMENT_OPTIONS.CARD) {
          cardPaymentMethodSpecificInput = {
            paymentProductId,
          };
        }
        break;
    }
  }

  cardPaymentMethodSpecificInput = {
    ...cardPaymentMethodSpecificInput,
    ...{ threeDSecure, tokenize, authorizationMode },
  };

  if (Object.keys(mobilePaymentMethodSpecificInput).length === 0) {
    mobilePaymentMethodSpecificInput = {
      authorizationMode,
    };
  }

  if (Object.keys(redirectPaymentMethodSpecificInput).length === 0) {
    redirectPaymentMethodSpecificInput = {
      requiresApproval: authorizationMode !== 'SALE',
    };
  }

  return {
    order: {
      amountOfMoney: {
        currencyCode,
        amount,
      },
      shipping,
      customer: {
        personalInformation,
        ...locale,
        merchantCustomerId,
        device: {
          ...locale,
          acceptHeader,
          userAgent,
        },
        billingAddress: {
          houseNumber: `${apartment} ${building}`,
          city: `${city}`,
          state: `${state}`,
          street: `${streetNumber} ${streetName}`,
          zip: `${zip}`,
          additionalInfo: `${additionalInfo}`,
          countryCode: `${countryCode}`,
        },
        contactDetails: {
          emailAddress: cart.customerEmail || '',
        },
      },
      ...(sendOrderData
        ? {
            shoppingCart: {
              items,
            },
          }
        : {}),
      references: {
        // this key is used to identify the merchant from webhook
        merchantReference: paymentId,
      },
    },
    cardPaymentMethodSpecificInput,
    hostedCheckoutSpecificInput,
    redirectPaymentMethodSpecificInput,
    sepaDirectDebitPaymentMethodSpecificInput,
    mobilePaymentMethodSpecificInput,
  };
}
