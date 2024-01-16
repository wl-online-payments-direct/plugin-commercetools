import React, { useState, useEffect } from 'react';
import Card from '@commercetools-uikit/card';
import ToggleInput from '@commercetools-uikit/toggle-input';
import './style.css';
import { GearIcon } from '@commercetools-uikit/icons';

const PaymentCard = ({ logo, active, handleChange }) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Card theme="light" type="raised" className="payment-options-card">
      <img
        className="payment-list-img"
        src={require(`../../assets/${logo}.png`)}
        alt={logo}
      />
      <p>{logo}</p>
      <div className="payment-options-card-actions flex algin-even">
        <ToggleInput
          isDisabled={false}
          isChecked={active}
          onChange={(event) =>
            handleChange(logo, 'enabled', event.target.checked)
          }
          size="small"
        />
        <GearIcon size="big" onClick={() => setShowPopover(!showPopover)} />
      </div>
      {showPopover && <Card theme="light" type="raised"></Card>}
    </Card>
  );
};

export default PaymentCard;
