import React from 'react';
import './style.css';
import PageWrapper from '../page-wrapper';

const OrderDetails = () => {
  return (
    <PageWrapper title={'Order Details'}>
      <div className="order-details"></div>
    </PageWrapper>
  );
};
OrderDetails.displayName = 'OrderDetails';

export default OrderDetails;
