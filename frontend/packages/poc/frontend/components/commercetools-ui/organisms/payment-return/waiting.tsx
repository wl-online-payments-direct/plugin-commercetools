import { FaRegHourglassHalf } from 'react-icons/fa6';
import Typography from 'components/commercetools-ui/atoms/typography';

export interface PaymentWaitingProps {
  className?: string;
}

const PaymentWaiting: React.FC<PaymentWaitingProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full ${className} flex flex-1 flex-col items-center justify-center`}>
      <FaRegHourglassHalf className="text-34" />
      <Typography className="md:text-34">{'Payment is currently being processed'}</Typography>
    </div>
  );
};

export default PaymentWaiting;
