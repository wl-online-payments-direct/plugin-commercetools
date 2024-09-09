import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { sdk } from 'sdk';
import Button from 'components/commercetools-ui/atoms/button';
import Radio from 'components/commercetools-ui/atoms/radio';
import { useWorldlineCheckout } from 'components/commercetools-ui/organisms/checkout/provider';
import {
  PaymentMethod,
  PaymentMethodType,
} from 'components/commercetools-ui/organisms/checkout/provider/payment/types';
import { useFormat } from 'helpers/hooks/useFormat';
import Worldline from './components/worldline';
import useProcessing from 'helpers/hooks/useProcessing';

type PaymentMethodResponse = {
  isError: boolean;
  data?: {
    paymentMethods?: PaymentMethod[];
  };
};

type HostedCheckoutResponse = {
  isError: boolean;
  data?: {
    result?: {
      redirectUrl: string;
    };
  };
};

const PaymentWordline: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[] | undefined>([]);
  const [paymentError, setPaymentError] = useState(false);
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>();
  const { validateCart, processPayment } = useWorldlineCheckout();
  const searchparams = useSearchParams();
  const isPaymentError = searchparams.get('paymentError') === 'true';
  const errorMessage = searchparams.get('message');
  const { processing, startProcessing, stopProcessing } = useProcessing();

  useEffect(() => {
    if (!isPaymentError) return;
    setPaymentError(true);
  }, [isPaymentError]);

  const getComponent = useCallback(
    (payment: PaymentMethod) => {
      const { paymentMethod, type } = payment;
      if (paymentMethod !== selectedPayment?.paymentMethod) return <></>;
      return (
        (
          {
            onsite: <Worldline />,
          } as Record<PaymentMethodType, JSX.Element>
        )[type] ?? <></>
      );
    },
    [selectedPayment?.paymentMethod],
  );

  const handlePaymentMethodSelection = useCallback(
    (payment: PaymentMethod) => {
      const { paymentMethod } = payment;
      if (paymentMethod !== selectedPayment?.paymentMethod) {
        setSelectedPayment(payment);
      }
    },
    [selectedPayment?.paymentMethod],
  );

  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
        const paymentmethodsResponse: PaymentMethodResponse = await sdk.callAction({
          actionName: 'payment/getPaymentMethods',
        });
        if (paymentmethodsResponse.isError === false) {
          const { data } = paymentmethodsResponse;
          if (data) {
            if (window && window.ApplePaySession) {
              setPaymentMethods(data.paymentMethods?.filter((payMethod) => payMethod.enabled));
            } else {
              setPaymentMethods(
                data.paymentMethods
                  ?.filter((payMethod) => payMethod.enabled)
                  .filter((d) => d.paymentMethod !== 'applepay'),
              );
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentMethods();
  }, []);

  const placeOrder = async () => {
    startProcessing();
    if (!selectedPayment) return;
    const { type, paymentMethod, paymentProductId } = selectedPayment;
    if (type === 'offsite') {
      try {
        const validateResponse = await validateCart();
        if (validateResponse) {
          if (validateResponse.statusCode === 200) {
            const hostedCheckoutResponse: HostedCheckoutResponse = await sdk.callAction({
              actionName: 'payment/getHostedCheckout',
              payload: {
                returnUrl: `${window.location.origin}/payment`,
                paymentMethod: paymentMethod,
                paymentProductId: paymentProductId,
              },
            });
            if (hostedCheckoutResponse.isError === false) {
              const { data } = hostedCheckoutResponse;
              if (data) {
                const { result } = data;
                if (result) {
                  const { redirectUrl } = result;
                  window.location.href = redirectUrl;
                }
              }
            }
          } else {
            console.error('No cart found');
          }
        }
        stopProcessing();
      } catch (error) {
        stopProcessing();
      }
    } else {
      processPayment();
    }
  };

  return (
    <div className="lg:px-36 lg:pb-36 lg:pt-0">
      {paymentError && errorMessage ? (
        <div className="relative my-10 rounded border border-red-400 bg-red-100 p-10 text-red-700" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
          <span className="absolute bottom-0 right-0 p-10" onClick={() => setPaymentError(false)}>
            <svg
              className="h-24 w-24 fill-current text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-24 border-x border-t border-neutral-400 bg-white lg:mt-0">
        {paymentMethods?.map((payment) => {
          const {
            name,
            paymentMethod,
            image: { src },
            displayOrder,
          } = payment;
          return (
            <div
              key={name}
              className="cursor-pointer border-b border-neutral-400 p-16 lg:px-20 lg:py-28"
              onClick={() => handlePaymentMethodSelection(payment)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-16">
                    <Radio name="checkout-shipping-method" checked={paymentMethod === selectedPayment?.paymentMethod} />
                    <p className="text-14 font-medium">{displayOrder !== undefined ? `Pay with ${name}` : name}</p>
                  </div>
                </div>
                {Array.isArray(src) ? (
                  <div className="flex items-center">
                    {src.map((imgSrc, index) => (
                      <img key={`payment-img-${index}`} src={imgSrc} className="mr-10 h-[20px] lg:h-[24px]" />
                    ))}
                  </div>
                ) : (
                  <img src={`${src}`} className="h-[20px] lg:h-[24px]" />
                )}
              </div>
              {getComponent(payment)}
            </div>
          );
        })}
      </div>
      <div className="mt-24">
        <Button
          variant="primary"
          className="w-full min-w-[200px] md:text-16 lg:w-fit lg:px-36"
          type="submit"
          onClick={placeOrder}
          loading={processing}
          // disabled={!paymentDataIsValid}
        >
          {formatCheckoutMessage({ id: 'review.order', defaultMessage: 'Submit order' })}
        </Button>
      </div>
    </div>
  );
};

export default PaymentWordline;
