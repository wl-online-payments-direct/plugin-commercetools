import React, { useState } from 'react';
import Card from '@commercetools-uikit/card';
import ToggleInput from '@commercetools-uikit/toggle-input';
import './style.css';
import { GearIcon } from '@commercetools-uikit/icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaymentModalComponent from '../payment-modal';
import { CloseIcon } from '@commercetools-uikit/icons';

const PaymentCard = ({ handlePaymentOptionUpdate, ...props }) => {
  const {
    logo,
    defaultLogo,
    label,
    enabled,
    paymentProductId,
    recurrenceType,
    signatureType,
    paymentOption,
  } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (check) => {
    if (check && label === 'Oney3x4x' && paymentOption?.length === 0) {
      handlePaymentOptionUpdate(label, 'enabled', false);
    } else if (
      check &&
      label === 'Intersolve' &&
      paymentProductId === undefined
    ) {
      handlePaymentOptionUpdate(label, 'enabled', false);
    }
    setOpen(false);
  };
  return (
    <>
      <Card theme="light" type="raised" className="payment-options-card">
        <img
          className="payment-list-img"
          src={logo}
          alt={label}
          onError={() => handlePaymentOptionUpdate(label, 'logo', defaultLogo)}
        />
        <div className="payment-title">{label}</div>
        <div className="payment-options-card-actions flex algin-even">
          <ToggleInput
            isDisabled={false}
            isChecked={enabled}
            onChange={(event) => {
              handlePaymentOptionUpdate(label, 'enabled', event.target.checked);
            }}
            size="small"
          />
          {enabled && (
            <div className="settings-payment">
              <GearIcon size="big" onClick={handleOpen} />
            </div>
          )}
        </div>
      </Card>
      {enabled && (
        <Modal
          open={open}
          onClose={() => handleClose(true)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="payment-logo-wrapper"
        >
          <Box className="popup-modal payment-logo-modal">
            <span className="close-button" onClick={() => handleClose(true)}>
              <CloseIcon />
            </span>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {label}
            </Typography>
            <PaymentModalComponent
              test={props}
              images={[logo]}
              source="modal"
              label={label}
              paymentProductId={paymentProductId}
              recurrenceType={recurrenceType}
              signatureType={signatureType}
              paymentOption={paymentOption}
              saveImage={(url) => handlePaymentOptionUpdate(label, 'logo', url)}
              handlePaymentFieldsUpdate={(value, url) => {
                handlePaymentOptionUpdate(label, 'fields', value);
                handlePaymentOptionUpdate(label, 'logo', url);
              }}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default PaymentCard;
