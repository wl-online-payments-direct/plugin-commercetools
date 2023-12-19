import React, { useState, useEffect } from 'react';
import Card from '@commercetools-uikit/card';
import ToggleInput from '@commercetools-uikit/toggle-input';
import './style.css';

const PaymentCard = ({ logo, active }) => {
  return (
    <Card theme="light" type="raised" className="payment-options-card">
      <img
        className="payment-list-img"
        src={require(`../../assets/${logo}.png`)}
        alt={logo}
      />
      <p>{logo}</p>
      <ToggleInput
        isDisabled={false}
        isChecked={active}
        onChange={(event) => alert(event.target.checked)}
        size="small"
      />
    </Card>
  );
};

export default PaymentCard;
