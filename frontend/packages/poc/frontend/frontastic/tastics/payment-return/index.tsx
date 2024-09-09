'use client';

import React from 'react';
import PaymentReturn, { PaymentReturnProps } from 'components/commercetools-ui/organisms/payment-return';
import { TasticProps } from '../types';

const PaymentReturnTastic = ({ data }: TasticProps<PaymentReturnProps>) => {
  return <PaymentReturn title={data.title} timer={data.timer} timerLimit={data.timerLimit} errorMessage={data.errorMessage} />;
};

export default PaymentReturnTastic;
