import { useEffect } from 'react';
import { sdk } from 'sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormat } from 'helpers/hooks/useFormat';
import PaymentWaiting from './waiting';
import { PAYMENT_AUTHORIZED, PAYMENT_CAPTURED, PAYMENT_FAILURE } from 'helpers/constants/payment';
import toast from 'react-hot-toast';

export interface PaymentReturnProps {
  title: string;
  timer: number;
  timerLimit: number;
  errorMessage: string;
  className?: string;
}

type StatusResponse = {
  isError: boolean;
  data?: {
    result?: {
      status: string;
      orderId: string;
    };
  };
};

const PaymentReturn: React.FC<PaymentReturnProps> = ({ timer, timerLimit, errorMessage, className = '' }) => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const paymentId: any = searchparams.get('orderPaymentId');
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  let showErrorMsg = true;

  useEffect(() => {
    const getWebhookStatus = async () => {
      const webhookStatus: StatusResponse = await sdk.callAction({
        actionName: 'payment/getWebhookStatus',
        query: {
          paymentId: paymentId,
        },
      });
      const { data } = webhookStatus;
      if (data?.result) {
        const { status = null, orderId } = data.result;
        if (status === PAYMENT_CAPTURED || status === PAYMENT_AUTHORIZED) {
          clearTimer();
          router.push(`/thank-you?orderId=${orderId}`);
          return;
        } else if (status === PAYMENT_FAILURE) {
          if (showErrorMsg) {
            toast(
              formatPaymentMessage({
                id: 'payment.myPaymentFailed',
                defaultMessage: 'Payment failed, Please try again',
              }),
            );
            showErrorMsg = false;
          }
          clearTimer();
          router.push(`/cart`);
          return;
        }
      }
    };

    const getPaymentStatus = async () => {
      const paymentStatus: StatusResponse = await sdk.callAction({
        actionName: 'payment/getPaymentStatus',
        query: {
          paymentId: paymentId,
        },
      });
      const { data } = paymentStatus;
      if (data?.result) {
        const { status = null, orderId } = data.result;
        if (status === PAYMENT_CAPTURED || status === PAYMENT_AUTHORIZED) {
          clearTimer();
          router.push(`/thank-you?orderId=${orderId}`);
          return;
        } else if (status === PAYMENT_FAILURE) {
          if (showErrorMsg) {
            toast(
              formatPaymentMessage({
                id: 'payment.myPaymentFailed',
                defaultMessage: 'Payment failed, Please try again',
              }),
            );
            showErrorMsg = false;
          }
          clearTimer();
          router.push(`/cart`);
          return;
        } else {
          router.push('/pending');
          return;
        }
      } else {
        router.push('/pending');
        return;
      }
    };

    const clearTimer = () => {
      clearInterval(intervalId);
      clearTimeout(timeroutId);
    };

    let intervalCounter = 1;
    const intervalId = setInterval(() => {
      if (intervalCounter * timer < timerLimit) {
        getWebhookStatus();
      }
      intervalCounter++;
    }, timer);
    const timeroutId = setTimeout(() => {
      clearInterval(intervalId);
      getPaymentStatus();
    }, timerLimit);

    return () => {
      clearTimer();
    };
  }, []);

  return (
    <div className={`relative w-full ${className} min-h-96 my-30 flex flex-col py-30`}>
      <PaymentWaiting />
    </div>
  );
};

export default PaymentReturn;
