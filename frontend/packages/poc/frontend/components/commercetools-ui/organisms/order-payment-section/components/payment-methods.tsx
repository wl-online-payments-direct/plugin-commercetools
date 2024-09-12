import { FC } from 'react';
import { useFormat } from 'helpers/hooks/useFormat';
import Image from 'frontastic/lib/image';
import { PaymentMethodsProps } from '../types';
import { useParams } from 'next/navigation';
import { getPaymentName, getTranslation } from '../../checkout/provider/payment/worldline/hooks/worldLineUtil';

const PaymentMethods: FC<PaymentMethodsProps> = ({ paymentMethods }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { locale } = useParams();

  return (
    <div className="mt-20 md:mt-24 lg:mt-16">
      <div className="hidden lg:block">
        <p className="text-14 leading-[20px] text-secondary-black">
          {formatCartMessage({ id: 'we.accept', defaultMessage: 'We accept' })}
        </p>
      </div>
      <div className="mt-26 flex items-center justify-start gap-14 md:justify-center lg:mt-16 lg:justify-start">
        {paymentMethods.map(({ name, image, displayOrder }) => {
          const displayName =
            displayOrder !== undefined
              ? getTranslation(name, locale)
              : typeof name === 'object'
              ? getPaymentName(name, locale)
              : name;
          return (
            <div key={displayName} className="relative h-30 w-30">
              {image?.src && (
                <Image {...image} src={`${image.src}`} fill style={{ objectFit: 'contain', marginRight: '10px' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethods;
