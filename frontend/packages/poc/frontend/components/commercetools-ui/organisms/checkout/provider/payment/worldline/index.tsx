import React, { useState } from 'react';
import {
  WLCreatePaymentData,
  WorldLinePaymentProvider,
  ValidateCartResponse,
} from 'components/commercetools-ui/organisms/checkout/provider/payment/types/worldlinetypes';
import { sdk } from 'sdk';

export const WorldlineContext = React.createContext<WorldLinePaymentProvider>({} as WorldLinePaymentProvider);

type HostedTokenizationResponse = {
  isError: boolean;
  data?: {
    result?: {
      hostedTokenizationUrl: string;
    };
  };
};

type ProcessPaymentResponse =
  | {
      statusCode: number;
      result: {
        id: string;
        worldlineId: string;
        orderPaymentId: string;
        actionType: string;
        redirectURL: string;
      };
    }
  | null
  | undefined;

type CreatePaymentResponse = {
  isError: boolean;
  data?: ProcessPaymentResponse;
};

const WorldlinePaymentProvider = ({ children }: React.PropsWithChildren) => {
  let worldlineInstance: any;
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const initWorldLineCheckout = async (hostedTokenizationUrl: string) => {
    // const options = paymentData?.token ? { hideTokenFields: true } : { hideCardholderName: false };
    const tokenizer = new Tokenizer(hostedTokenizationUrl, 'div-hosted-tokenization', { hideCardholderName: false });
    worldlineInstance = tokenizer;
    tokenizer
      .initialize()
      .then(() => {
        setIframeLoaded(true)
        // Do work after initialization, if any
      })
      .catch(() => {
        setIframeLoaded(false)
        console.error('worldline failed to intialize');
      });
  };

  const fetchHostedTokenizationURL = async () => {
    const hostedTokenization: HostedTokenizationResponse = await sdk.callAction({
      actionName: 'payment/getHostedTokenization',
    });
    if (hostedTokenization.isError === false) {
      const { data } = hostedTokenization;
      if (data) {
        const { result } = data;
        if (result) {
          const { hostedTokenizationUrl } = result;
          if (hostedTokenizationUrl) {
            initWorldLineCheckout(hostedTokenizationUrl);
          }
        }
      }
    }
  };

  const createWorldLinePayment = async (data: WLCreatePaymentData) => {
    const createPaymentResponse: CreatePaymentResponse = await sdk.callAction({
      actionName: 'payment/createPayment',
      payload: {
        data,
      },
    });
    if (createPaymentResponse.isError === false) {
      const { data } = createPaymentResponse;
      return data;
    }
    return null;
  };

  const validateCart = async () => {
    const validateCartResponse: ValidateCartResponse = await sdk.callAction({ actionName: 'payment/validateCart' });
    if (validateCartResponse.isError === false) {
      const { data } = validateCartResponse;
      return data;
    }
    return null;
  };

  const processPayment = async () => {
    if (worldlineInstance) {
      worldlineInstance.submitTokenization().then(async (result: any) => {
        if (result.success) {
          const paymentPayload: WLCreatePaymentData = {
            hostedTokenizationId: result.hostedTokenizationId,
            returnUrl: window.location.origin + '/payment',
          };
          const validateResponse = await validateCart();
          if (validateResponse) {
            if (validateResponse.statusCode === 200) {
              const response: ProcessPaymentResponse = await createWorldLinePayment(paymentPayload);
              if (response) {
                const { statusCode, result: dataResponse } = response;
                const { orderPaymentId, actionType, redirectURL } = dataResponse;
                if (statusCode === 200) {
                  window.location.href =
                    actionType === 'REDIRECT' ? redirectURL : `/payment?orderPaymentId=${orderPaymentId}`;
                }
              }
            } else {
              console.error('No cart found');
            }
          }
        } else {
          console.error('failed to tokenise card', result);
        }
      });
    }
  };

  return (
    <WorldlineContext.Provider
      value={{
        iframeLoaded,
        validateCart,
        processPayment,
        fetchHostedTokenizationURL,
      }}
    >
      {children}
    </WorldlineContext.Provider>
  );
};

export default WorldlinePaymentProvider;
