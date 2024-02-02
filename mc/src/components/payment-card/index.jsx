import React, { useState } from 'react';
import Card from '@commercetools-uikit/card';
import ToggleInput from '@commercetools-uikit/toggle-input';
import './style.css';
import { GearIcon } from '@commercetools-uikit/icons';

const PaymentCard = ({ logo, label, enabled, handlePaymentOptionUpdate }) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Card theme="light" type="raised" className="payment-options-card">
      <img className="payment-list-img" src={logo} alt={label} />
      <div className="payment-title">{label}</div>
      <div className="payment-options-card-actions flex algin-even">
        <ToggleInput
          isDisabled={false}
          isChecked={enabled}
          onChange={(event) =>
            handlePaymentOptionUpdate(label, 'enabled', event.target.checked)
          }
          size="small"
        />
        {enabled && (
          <GearIcon size="big" onClick={() => setShowPopover(!showPopover)} />
        )}
      </div>
      {showPopover && <Card theme="light" type="raised"></Card>}
    </Card>
  );
};

export default PaymentCard;
