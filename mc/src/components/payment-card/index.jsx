import React, { useState } from 'react';
import Card from '@commercetools-uikit/card';
import ToggleInput from '@commercetools-uikit/toggle-input';
import './style.css';
import { GearIcon } from '@commercetools-uikit/icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageUpload from '../image-upload';
import { CloseIcon } from '@commercetools-uikit/icons';

const PaymentCard = ({ logo, label, enabled, handlePaymentOptionUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card theme="light" type="raised" className="payment-options-card">
        <img className="payment-list-img" src={logo} alt={label} />
        <div className="payment-title">{label}</div>
        <div className="payment-options-card-actions flex algin-even">
          <ToggleInput
            isDisabled={false}
            isChecked={enabled}
            onChange={(event) => {
              handlePaymentOptionUpdate(label, 'enabled', event.target.checked);
              if (event.target.checked) {
                handleOpen();
              }
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
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="payment-logo-wrapper"
        >
          <Box className="payment-logo-modal">
            <span className="close-button" onClick={handleClose}>
              <CloseIcon />
            </span>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {label}
            </Typography>
            <ImageUpload
              images={[
                {
                  value: logo,
                },
              ]}
              source="modal"
              saveImage={(url) => handlePaymentOptionUpdate(label, 'logo', url)}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default PaymentCard;
