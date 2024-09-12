import React, { useCallback, useEffect, useState } from 'react';
//import { PaymentMethod, PaymentMethodType } from 'shared/types/cart/Payment';
import Button from 'components/commercetools-ui/atoms/button';
import Radio from 'components/commercetools-ui/atoms/radio';
import { useCheckout, useWorldlineCheckout } from 'components/commercetools-ui/organisms/checkout/provider';
import {
  PaymentMethod,
  PaymentMethodType,
  PaymentData,
} from 'components/commercetools-ui/organisms/checkout/provider/payment/types';
import { useParams } from 'next/navigation';
import { useFormat } from 'helpers/hooks/useFormat';
import Klarna from './components/klarna';
import Scheme from './components/scheme';
import {
  getPaymentName,
  getTranslation,
} from 'components/commercetools-ui/organisms/checkout/provider/payment/worldline/hooks/worldLineUtil';

interface Props {
  goToNextStep: () => void;
}

const Payment: React.FC<Props> = ({ goToNextStep }) => {
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });
  const { getPaymentMethods, setPaymentData, paymentData, paymentDataIsValid } = useCheckout();
  const { processPayment } = useWorldlineCheckout();
  const { locale } = useParams();

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const [selectedType, setSelectedType] = useState<PaymentMethodType>('scheme');

  const fetchPaymentMethods = useCallback(async () => {
    const paymentMethods = await getPaymentMethods();
    setPaymentMethods(paymentMethods);
  }, [getPaymentMethods]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const submit = useCallback(() => {
    goToNextStep();
  }, [goToNextStep]);

  const getComponent = useCallback(
    (type: PaymentMethodType) => {
      if (type !== selectedType) return <></>;
      return (
        (
          {
            scheme: <Scheme />,
            klarna_paynow: <Klarna />,
          } as Record<PaymentMethodType, JSX.Element>
        )[type] ?? <></>
      );
    },
    [selectedType],
  );

  const handlePaymentMethodSelection = useCallback(
    (type: PaymentMethodType) => {
      if (type !== selectedType) {
        setSelectedType(type);
        setPaymentData({ ...paymentData, type } as PaymentData);
      }
    },
    [selectedType, setPaymentData, paymentData],
  );

  return (
    <div className="lg:px-36 lg:pb-36 lg:pt-0">
      <div className="mt-24 border-x border-t border-neutral-400 bg-white lg:mt-0">
        {paymentMethods.map(({ name, type, image, displayOrder }) => {
          const displayName =
            displayOrder !== undefined
              ? getTranslation(name, locale)
              : typeof name === 'object'
              ? getPaymentName(name, locale)
              : name;
          return (
            <div
              key={type}
              className="cursor-pointer border-b border-neutral-400 p-16 lg:px-20 lg:py-28"
              onClick={() => handlePaymentMethodSelection(type)}
            >
              <div className="flex items-center justify-between lg:justify-start lg:gap-64">
                <div>
                  <div className="flex items-center gap-16">
                    <Radio name="checkout-shipping-method" checked={type === selectedType} />
                    <p className="text-14 font-medium">{displayName}</p>
                  </div>
                </div>
                {/* eslint-disable-next-line */}
                {image?.src && <img src={`${image.src}`} className="mr-10 h-[20px] lg:h-[24px]" />}
              </div>
              {getComponent(type)}
            </div>
          );
        })}
      </div>
      <div className="mt-24">
        <Button
          variant="primary"
          className="w-full min-w-[200px] md:text-16 lg:w-fit lg:px-36"
          type="submit"
          onClick={submit}
          disabled={!paymentDataIsValid}
        >
          {formatCheckoutMessage({ id: 'review.order', defaultMessage: 'Review order' })}
        </Button>
      </div>
      <Button onClick={() => processPayment()}>Submit</Button>
    </div>
  );
};

export default Payment;
