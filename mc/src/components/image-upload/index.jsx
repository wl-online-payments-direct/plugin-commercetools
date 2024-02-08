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
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const ImageUpload = ({ images = [], source, saveImage, handleClose }) => {
  const [imagesData, setImagesData] = useState([...new Set(images)]);
  const [openModal, setOpenmodal] = useState(false);
  const [dimError, setDimError] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => {
    setDimError(false);
    setOpenmodal(false);
  };
  const [deleteUrl, setDeleteUrl] = useState('');
  const { setLoader, imageUploader } = useContext(PaymentContext);
  const apiHost = useApplicationContext(
    (context) => context.environment.apiHost
  );

  const handleImageUpload = async (files) => {
    if (!files) {
      return;
    }
    const toasterFlag = source !== 'modal' ? true : false;
    const res = await imageUploader(files, toasterFlag);
    setLoader(false);
    if (res && res.length >= 0) {
      if (source !== 'modal') {
        setImagesData(imagesData.concat(`${apiHost}/${res[0]}`));
        saveImage(imagesData.concat(`${apiHost}/${res[0]}`));
      } else {
        setImagesData([`${apiHost}/${res[0]}`]);
      }
      const uploadEle = document.getElementById('upload-file');
      if (uploadEle) uploadEle.value = '';
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
            (height <= 200 && width <= 80) ||
            (width <= 200 && height <= 80)
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
    saveImage(imagesData[0]);
    setDimError(false);
    handleClose();
  };

  useEffect(() => {
    setImagesData(images);
  }, [images]);

  const ImageContainer = ({ url }) => {
    return (
      <div className="image-wrapper">
        {url ? (
          <div className="image-container">
            <img src={url} alt={url} className="logo-img" />
            {source !== 'modal' && (
              <span
                className="close-button"
                onClick={() => {
                  setDeleteUrl(url);
                  handleOpenModal();
                }}
              >
                <CloseIcon />
              </span>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  const handleImageDelete = () => {
    const deleteIndex = imagesData.indexOf(deleteUrl);
    imagesData.splice(deleteIndex, 1);
    handleCloseModal();
  };

  return (
    <div>
      <div className="image-upload">
        {imagesData && imagesData.length > 0 ? (
          imagesData.map((image, key) => (
            <ImageContainer key={`image-${key}`} url={image} />
          ))
        ) : (
          <ImageIcon className="logo-placeholder" sx={{ opacity: 0.2 }} />
        )}
      </div>
      <div className="logo-actions">
        {dimError && (
          <div style={{ margin: '10px' }}>
            <Alert severity="error">{'Upload logo maximum 200x80px.'}</Alert>
          </div>
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
            id="upload-file"
            className="hidden-input"
            onChange={handleFileChange}
            accept="image/png, image/gif, image/jpeg, image/svg, image/jpg"
            name="img-file"
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
              handleCloseModal();
            }}
          >
            <CloseIcon />
          </span>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {'Do you want to delete the image ?'}
          </Typography>
          <div className="image-upload">
            <Button
              className="save-btn"
              variant="solid"
              onClick={() => {
                handleImageDelete();
              }}
            >
              Yes
            </Button>
            <Button
              className="cancel-btn"
              variant="soft"
              onClick={() => {
                handleCloseModal();
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
