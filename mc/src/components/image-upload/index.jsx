import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { PaymentContext } from '../../context/payment';
import ImageIcon from '@mui/icons-material/Image';
import { CloseIcon } from '@commercetools-uikit/icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { apiHost } from '../../constants';

const ImageUpload = ({ images, source, saveImage, handleClose }) => {
  const [imagesData, setImgesData] = useState(images);
  const [openModal, setOpenmodal] = useState(false);
  const [dimError, setDimError] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => setOpenmodal(false);
  const { setLoader, imageUploader } = useContext(PaymentContext);

  const handleImageUpload = async (files) => {
    if (!files) {
      return;
    }
    const toasterFlag = source !== 'modal' ? true : false;
    const res = await imageUploader(files, toasterFlag);
    setLoader(false);
    if (res && res.length >= 0) {
      setImgesData(
        res.map((img) => {
          return { value: `${apiHost}/${img}` };
        })
      );

      if (source !== 'modal') {
        saveImage(res.map((img) => `${apiHost}/${img}`));
      }
    }
    setDimError(false);
  };

  const handleFileChange = async (e) => {
    setDimError(false);
    let files = e.target.files;
    if (files && files.length) {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          const height = this.height;
          const width = this.width;
          if (
            (height <= 2000 && width <= 3000) ||
            (width <= 2000 && height <= 3000)
          ) {
            handleImageUpload(files);
          } else {
            setDimError(true);
          }
        };
      };
    }
  };

  const handleSaveImage = () => {
    saveImage(imagesData[0].value);
    setDimError(false);
    handleClose();
  };

  useEffect(() => {
    setImgesData(images);
  }, [images]);

  const ImageContainer = ({ value: url }) => {
    return (
      <div className="image-wrapper">
        {url ? (
          <div className="image-container">
            <img src={url} alt={url} className="logo-img" />
            {source !== 'modal' && url.length > 0 && (
              <span className="close-button" onClick={handleOpenModal}>
                <CloseIcon />
              </span>
            )}
          </div>
        ) : (
          <ImageIcon className="logo-placeholder" sx={{ opacity: 0.2 }} />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="image-upload">
        <div>
          {imagesData.map((image, key) => (
            <ImageContainer key={`image-${key}`} {...image} />
          ))}
          {dimError && (
            <div>
              <Alert severity="error">{'Upload logo maximum 200x80px.'}</Alert>
            </div>
          )}
        </div>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          className="upload-btn"
        >
          Upload a file
          <input
            type="file"
            id="upload-file"
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
            onClick={() => {
              setDimError(false);
              handleClose();
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={() => {
          setDimError(false);
          handleCloseModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="payment-logo-wrapper"
      >
        <Box className="payment-logo-modal">
          <span
            className="close-button"
            onClick={() => {
              setDimError(false);
              handleCloseModal();
            }}
          >
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
                setDimError(false);
                saveImage([]);
                handleCloseModal();
              }}
            >
              Yes
            </Button>
            <Button
              className="cancel-btn"
              variant="soft"
              onClick={() => {
                setDimError(false);
                handleCloseModal;
              }}
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
