import React, { useState } from 'react';
import Card from '@commercetools-uikit/card';
import ToggleInput from '@commercetools-uikit/toggle-input';
import './style.css';
import { GearIcon } from '@commercetools-uikit/icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageUpload from '../image-upload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {label}
            </Typography>
            <ImageUpload src={logo} alt={label} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default PaymentCard;
