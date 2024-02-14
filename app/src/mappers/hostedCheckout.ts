import { Cart } from '@worldline/ctintegration-ct';
import { CustomObjects, HostedMyCheckoutPayload } from '../types';
import { appendAdditionalParamsToUrl } from './common';

export function getHostedCheckoutPayload(
  customConfig: CustomObjects,
  reference: { referenceId: number },
  cart: Cart,
  payload: HostedMyCheckoutPayload,
) {
  const amount = cart?.taxedPrice?.totalGross.centAmount || 0;
  const currencyCode = cart?.taxedPrice?.totalGross.currencyCode || '';
  const merchantCustomerId = cart?.customerId || cart?.anonymousId || '';
  const locale = cart?.locale ? { locale: cart.locale } : {};

  const {
    variant,
    merchantReference,
    redirectModeA,
    redirectModeB,
    authorizationMode,
  } = customConfig;
  const { tokens, acceptHeader, userAgent, paymentProductId } = payload;

  // Personal information
  // Todo: due to type error cart.customer trigger error
  const personalInformation = {
    name: {
      title: cart,
      firstName: '',
      surname: '',
    },
    gender: '',
    dateOfBirth: '',
  };

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

  // Shipping address
  const { shippingAddress } = cart;
  const shipping = {
    address: {
      name: {
        firstName: shippingAddress?.firstName || '',
        surname: shippingAddress?.lastName || '',
      },
      houseNumber: `${shippingAddress?.apartment} ${shippingAddress?.building}`,
      zip: shippingAddress?.postalCode || '',
      city: shippingAddress?.city || '',
      countryCode: shippingAddress?.country || '',
    },
  };

  // Line items
  const items = cart.lineItems.map((lineItem) => ({
    amountOfMoney: {
      currencyCode: lineItem.totalPrice.currencyCode,
      amount: lineItem.totalPrice.centAmount,
    },
    invoiceData: {
      description: lineItem.productType.obj?.description,
    },
    orderLineDetails: {
      productName: '', // Todo, will pass the locale to cart to get the name
      discountAmount: 0, // Todo, getting an array of discount
      productCode: lineItem.productId,
      productPrice: lineItem.price.value.centAmount,
      productType: lineItem.productType.obj?.name,
      quantity: lineItem.quantity,
      taxAmount: lineItem.taxRate?.amount,
    },
  }));

  // Concat with the merchant reference
  const paymentId = `${merchantReference}-${reference?.referenceId?.toString()}`;

  const returnUrl = appendAdditionalParamsToUrl(payload.returnUrl, {
    orderPaymentId: paymentId,
  });

  // Advanced Admin Settings: option to group all hosted checkout cards
  const groupCards = !!redirectModeB?.groupCards;

  let cardPaymentMethodSpecificInput = {};
  let hostedCheckoutSpecificInput = {};
  let redirectPaymentMethodSpecificInput = {};
  let sepaDirectDebitPaymentMethodSpecificInput = {};
  let mobilePaymentMethodSpecificInput = {};

  const sepaDirectDebitSettings = redirectModeA.paymentOptions.find(
    (paymentOption) => paymentOption.paymentProductId === paymentProductId,
  );
  const { recurrenceType = 'UNIQUE', signatureType = 'SMS' } =
    sepaDirectDebitSettings || {};

  switch (paymentProductId) {
    // Klarna
    case 3306:
      hostedCheckoutSpecificInput = {
        returnUrl,
      };
      redirectPaymentMethodSpecificInput = {
        paymentProductId,
      };
      break;
    // Oney
    case 5110:
      hostedCheckoutSpecificInput = {
        ...locale,
      };
      redirectPaymentMethodSpecificInput = {
        requiresApproval: false, // must be set as false, As oney only allow direct sale
        paymentProductId,
        paymentOption: '',
      };
      break;
    // Sepa Direct Debit
    case 771:
      hostedCheckoutSpecificInput = {
        returnUrl,
        ...locale,
        paymentProductFilters: {
          restrictTo: {
            products: [paymentProductId],
          },
        },
      };
      sepaDirectDebitPaymentMethodSpecificInput = {
        paymentProduct771SpecificInput: {
          mandate: {
            returnUrl,
            customerReference: merchantCustomerId,
            recurrenceType,
            signatureType,
          },
        },
      };
      break;
    // Multibanco
    case 5500:
      hostedCheckoutSpecificInput = {
        ...locale,
      };
      redirectPaymentMethodSpecificInput = {
        paymentProductId,
      };
      break;
    // Applepay
    case 302:
      hostedCheckoutSpecificInput = {
        returnUrl,
        ...locale,
      };
      mobilePaymentMethodSpecificInput = {
        authorizationMode,
        paymentProductId,
      };
      break;
    // P24
    case 3124:
      hostedCheckoutSpecificInput = {
        ...locale,
      };
      redirectPaymentMethodSpecificInput = {
        paymentProductId,
        returnUrl,
      };
      break;
    // EPS
    case 5406:
      redirectPaymentMethodSpecificInput = {
        paymentProductId,
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
      };
      hostedCheckoutSpecificInput = {
        returnUrl,
      };
      break;
    default:
      hostedCheckoutSpecificInput = {
        variant,
        ...locale,
        tokens,
        returnUrl,
        cardPaymentMethodSpecificInput: {
          groupCards,
        },
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
          emailAddress: cart.customerEmail,
        },
      },
      shoppingCart: {
        items,
      },
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
