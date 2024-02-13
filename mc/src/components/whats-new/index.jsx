import React, { useContext, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { CloseIcon } from '@commercetools-uikit/icons';
import Label from '@commercetools-uikit/label';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import { PaymentContext } from '../../context/payment';
import './style.css';

const WhatsNew = () => {
  const [openModal, setOpenmodal] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => setOpenmodal(false);
  const { fetchReleaseNotes } = useContext(PaymentContext);
  const [releaseNotes, setReleaseNotes] = useState(() => {
    const notes = fetchReleaseNotes();
    return notes;
  });
  console.log('notes', notes);

  return (
    <div>
      <div className="relese-notes-wrapper">
        <Label onClick={handleOpenModal}>What's New</Label>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="whats-new-wrapper"
      >
        <Box className="whats-new-modal">
          <span className="close-button" onClick={handleCloseModal}>
            <CloseIcon />
          </span>
          <div className="whats-new">
            <h5 className="section-header">What's New</h5>
            <MultilineTextField
              title="Description"
              value={releaseNotes}
              isDisabled={true}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default WhatsNew;
