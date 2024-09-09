'use client';

import React from 'react';
import { TasticProps } from '../types';
import PaymentPending, { PaymentPendingProps } from 'components/commercetools-ui/organisms/payment-pending';

const PaymentPendingTastic = ({ data }: TasticProps<PaymentPendingProps>) => {
  return <PaymentPending title={data.title} />;
};

export default PaymentPendingTastic;
