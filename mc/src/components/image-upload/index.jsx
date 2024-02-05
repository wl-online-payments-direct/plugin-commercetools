import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { PaymentContext } from '../../context/payment';
import ImageIcon from '@mui/icons-material/Image';
import CONFIG from '../../../configuration';
import { CloseIcon } from '@commercetools-uikit/icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ImageUpload = ({ value, alt, source, saveImage, handleClose }) => {
  const [imgData, setImgData] = useState({
    src: value,
    alt: alt,
  });
  const [openModal, setOpenmodal] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => setOpenmodal(false);
  const { setLoader, imageUploader, hideToaster } = useContext(PaymentContext);
  const { host } = CONFIG;

  const handleImageUpload = async (file) => {
    if (!file) {
      return;
    }
    const res = await imageUploader(file);
    setLoader(false);
    if (res && res.length >= 0) {
      setImgData({
        src: `${host}/${res[0]}`,
        alt: file.name,
      });
      if (source !== 'modal') {
        saveImage(`${host}/${res[0]}`);
      }
    }
    setTimeout(() => {
      hideToaster();
    }, 3000);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleSaveImage = () => {
    saveImage(imgData.src);
    handleClose();
  };

  useEffect(() => {
    setImgData({
      src: value,
      alt: alt,
    });
  }, [value]);

  return (
    <div>
      <div className="image-upload">
        {imgData.src ? (
          <div className="image-container">
            <img src={imgData.src} alt={imgData?.alt} className="logo-img" />
            {source !== 'modal' && (
              <span className="close-button" onClick={handleOpenModal}>
                <CloseIcon />
              </span>
            )}
          </div>
        ) : (
          <ImageIcon className="logo-placeholder" sx={{ opacity: 0.2 }} />
        )}
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          className="upload-btn"
        >
          Upload a file
          <input
            type="file"
            className="hidden-input"
            onChange={handleFileChange}
            accept="image/png, image/gif, image/jpeg"
          />
        </Button>
      </div>
      {source === 'modal' && (
        <div className="image-upload">
          <Button
            className="save-btn"
            variant="solid"
            onClick={() => handleSaveImage()}
          >
            Save
          </Button>
          <Button
            className="cancel-btn"
            variant="soft"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="payment-logo-wrapper"
      >
        <Box className="payment-logo-modal">
          <span className="close-button" onClick={handleCloseModal}>
            <CloseIcon />
          </span>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {'Do you want to delete the image?'}
          </Typography>
          <div className="image-upload">
            <Button
              className="save-btn"
              variant="solid"
              onClick={() => {
                setImgData({
                  src: '',
                  alt: '',
                });
                handleCloseModal();
              }}
            >
              Yes
            </Button>
            <Button
              className="cancel-btn"
              variant="soft"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ImageUpload;
