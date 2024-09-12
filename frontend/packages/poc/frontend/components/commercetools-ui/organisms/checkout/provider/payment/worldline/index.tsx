import React, { useState, useEffect } from 'react';
import {
  WLCreatePaymentData,
  WorldLinePaymentProvider,
  ValidateCartResponse,
  ValidateResponse,
} from 'components/commercetools-ui/organisms/checkout/provider/payment/types/worldlinetypes';
import { PaymentMethod } from 'components/commercetools-ui/organisms/checkout/provider/payment/types';
import { sdk } from 'sdk';
import useProcessing from 'helpers/hooks/useProcessing';

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
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [worldlineInstance, setWorldLineInstance] = useState<any>();
  const { startProcessing, stopProcessing } = useProcessing();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>();
  const [extra3dsOptions, setExtra3dsOptions] = useState<any>();

  useEffect(() => {
    setExtra3dsOptions({
      device: {
        timezoneOffsetUtcMinutes: new Date().getTimezoneOffset(),
        browserData: {
          colorDepth: screen.colorDepth,
          screenHeight: screen.height,
          screenWidth: screen.width,
          javaEnabled: navigator.javaEnabled(),
        },
      },
    });
  }, []);

  const initWorldLineCheckout = async (hostedTokenizationUrl: string) => {
    const options = selectedPayment?.token ? { hideTokenFields: false } : { hideCardholderName: false };
    const tokenizer = new Tokenizer(
      hostedTokenizationUrl,
      'div-hosted-tokenization',
      { ...options },
      selectedPayment && selectedPayment?.token,
    );
    setWorldLineInstance(tokenizer);
    tokenizer
      .initialize()
      .then(() => {
        setIframeLoaded(true);
        // Do work after initialization, if any
      })
      .catch(() => {
        setIframeLoaded(false);
        console.error('worldline failed to intialize');
      });
  };

  const fetchHostedTokenizationURL = async () => {
    const hostedTokenization: HostedTokenizationResponse = await sdk.callAction({
      actionName: 'payment/getHostedTokenization',
      payload: {
        ...extra3dsOptions,
        ...(selectedPayment &&
          selectedPayment?.token && {
            cardToken: selectedPayment?.token,
          }),
      },
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
        ...extra3dsOptions,
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
      startProcessing();
      worldlineInstance.submitTokenization().then(async (result: any) => {
        if (result.success) {
          const paymentPayload: WLCreatePaymentData = {
            hostedTokenizationId: result.hostedTokenizationId,
            returnUrl: window.location.origin + '/payment',
          };
          const validateResponse: ValidateResponse = await validateCart();
          if (validateResponse?.statusCode === 200 && validateResponse?.result?.hasInventory) {
            const response: ProcessPaymentResponse = await createWorldLinePayment(paymentPayload);
            if (response) {
              const { statusCode, result: dataResponse } = response;
              if (dataResponse) {
                const { orderPaymentId, actionType, redirectURL } = dataResponse;
                if (statusCode === 200) {
                  window.location.href =
                    actionType === 'REDIRECT' ? redirectURL : `/payment?orderPaymentId=${orderPaymentId}`;
                } else {
                  stopProcessing();
                }
              } else {
                stopProcessing();
              }
            }
          } else {
            console.error('No cart found');
            stopProcessing();
          }
        } else {
          console.error('failed to tokenise card', result);
          stopProcessing();
        }
      });
    } else {
      stopProcessing();
    }
  };

  return (
    <WorldlineContext.Provider
      value={{
        iframeLoaded,
        validateCart,
        processPayment,
        fetchHostedTokenizationURL,
        setSelectedPayment,
        selectedPayment,
      }}
    >
      {children}
    </WorldlineContext.Provider>
  );
};

export default WorldlinePaymentProvider;
