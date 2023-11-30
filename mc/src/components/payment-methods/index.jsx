import React, { useContext, useEffect } from 'react';
import './style.css';
import PageWrapper, { PaymentContext } from '../page-wrapper';

const PaymentMethods = () => {
  const payment = useContext(PaymentContext);
  return (
    <PageWrapper title={'Payment Methods'}>
      <div className="payment-methods">{payment}</div>
    </PageWrapper>
  );
};
PaymentMethods.displayName = 'PaymentMethods';

export default PaymentMethods;
