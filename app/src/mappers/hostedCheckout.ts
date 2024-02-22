import { Cart, Customer } from '@worldline/ctintegration-ct';
import { logger } from '@worldline/ctintegration-util';
import { CustomObjects, HostedMyCheckoutPayload } from '../types';
import { appendAdditionalParamsToUrl } from './common';

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

  const { merchantReference, redirectModeA, redirectModeB, authorizationMode } =
    customConfig;
  const { tokens, acceptHeader, userAgent, paymentProductId } = payload;

  // Personal information
  const { customer } = cart as CartWithCustomer;
  const personalInformation = {
    name: {
      title: customer?.title,
      firstName: customer?.firstName,
      surname: customer?.lastName,
    },
    dateOfBirth: customer?.dateOfBirth || '',
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

  // Shipping
  const { shippingAddress, taxedShippingPrice } = cart;
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
    shippingCost: taxedShippingPrice?.totalNet.centAmount,
    shippingCostTax: taxedShippingPrice?.totalTax?.centAmount,
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
      productName: '', // Todo, will pass the locale to cart to get the name
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
  const variant = redirectModeB?.templateFileName || '';

  let cardPaymentMethodSpecificInput = {};
  let redirectPaymentMethodSpecificInput = {};
  let sepaDirectDebitPaymentMethodSpecificInput = {};
  let mobilePaymentMethodSpecificInput = {};

  const paymentSettings = redirectModeA.paymentOptions.find(
    (paymentOption) => paymentOption.paymentProductId === paymentProductId,
  );
  const {
    recurrenceType = 'UNIQUE',
    signatureType = 'SMS',
    paymentOption = '',
  } = paymentSettings || {};

  const hostedCheckoutSpecificInput = {
    variant,
    ...locale,
    tokens,
    returnUrl,
    cardPaymentMethodSpecificInput: {
      groupCards,
    },
    paymentProductFilters: {},
  };

  switch (paymentProductId) {
    // Klarna
    case 3306:
      redirectPaymentMethodSpecificInput = {
        paymentProductId,
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
            customerReference: merchantCustomerId,
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
      break;
    default:
      logger().error(`Received invalid payment product Id ${paymentProductId}`);
      break;
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
