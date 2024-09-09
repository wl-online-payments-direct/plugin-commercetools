export interface PaymentPendingProps {
  title?: string;
  className?: string;
}

const PaymentPending: React.FC<PaymentPendingProps> = ({ title }) => {
  return <>{title}</>;
};

export default PaymentPending;
