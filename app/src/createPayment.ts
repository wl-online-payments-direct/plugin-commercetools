import { getMyCart, getCustomObjects } from '@worldline/ct-integration';
import { createPaymentService } from '@worldline/psp-integration';
import {
  createPaymentInDB,
  getIncrementedPaymentId,
} from '@worldline/db-integration';
import { CreatePaymentPayload } from './types';
import { createPaymentMapper } from './mappers';

export async function createPayment({
  authToken,
  storeId,
  hostedTokenizationId,
  returnUrl,
}: CreatePaymentPayload) {
  // Fetch cart from Commercetools
  const { cart, customer } = await getMyCart(authToken);

  if (!cart) {
    throw { message: 'Failed to fetch the cart data', statusCode: 400 };
  }

  // Fetch custom objects from admin config
  const customConfig = await getCustomObjects(authToken, storeId);

  if (!customConfig) {
    throw { message: 'Failed to fetch the custom object', statusCode: 400 };
  }

  const {
    merchantReference,
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
    authorizationMode,
  } = customConfig;
  
  // Prepare payload for the service connection
  const connectOpts = {
    merchantId,
    integrator,
    apiKey,
    apiSecret,
    host,
  };

  const { incrementedPaymentId } = await getIncrementedPaymentId();
  const paymentId = `${merchantReference}-${incrementedPaymentId}`;

  // 3DS authentication. `skipAuthentication` will be decide based on admin config
  const skipAuthentication = true;

  // Payment action. `requiresApproval` is decided based on `authorizationMode` in admin config
  // const requiresApproval = authorizationMode !== 'SALE';
  
  // Prepare service payload for create payment
  const createPaymentPayload = {
    hostedTokenizationId,
    cardPaymentMethodSpecificInput: {
      authorizationMode,
      threeDSecure: {
        skipAuthentication,
        redirectionData: {
          returnUrl
        },
      },
    },
    /* mobilePaymentMethodSpecificInput:{
      authorizationMode,
    },
    redirectPaymentMethodSpecificInput:{
      requiresApproval,
    }, */
    order: {
      customer: {
        merchantCustomerId: cart.customerId || customer.id,
        device: {
          acceptHeader:
                  'text/html,application/xhtml+xml,application/xmlq=0.9,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3',
          locale: 'en_US',
          timezoneOffsetUtcMinutes: '-180',
          userAgent:
                  'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
          browserData: {
            colorDepth: 24,
            javaScriptEnabled: false,
            screenHeight: '1080',
            screenWidth: '1920',
          },
        },
      },
      references:{
        // this key is used to identify the merchant from webhook
        merchantReference: paymentId
      },
      amountOfMoney: {
        amount: cart.taxedPrice.totalGross.centAmount,
        currencyCode: cart.taxedPrice.totalGross.currencyCode,
      },
    },
  };

  const payment = await createPaymentService(
    connectOpts,
    createPaymentPayload
  );

  // save the payment information to database
  const createPaymenDBResponse = await createPaymentInDB({
    authMode: authorizationMode,
    paymentId,
    worldlineId: payment.id.toString(),
    storeId,
    cartId: cart.id,
    orderId: '',
  });

  return createPaymentMapper(createPaymenDBResponse);

}
