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

const ImageUpload = ({ images, source, saveImage, handleClose }) => {
  console.log(source, 'images', images);
  const [imagesData, setImgesData] = useState(images);
  const [openModal, setOpenmodal] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => setOpenmodal(false);
  const { setLoader, imageUploader, hideToaster } = useContext(PaymentContext);
  const { host } = CONFIG;

  const handleImageUpload = async (files) => {
    if (!files) {
      return;
    }
    const res = await imageUploader(files);
    setLoader(false);
    if (res && res.length >= 0) {
      setImgesData(res);
      console.log('Upload', res);
      if (source !== 'modal') {
        saveImage(res.map((img) => `${host}/${img}`));
      }
    }
    setTimeout(() => {
      hideToaster();
    }, 3000);
  };

  const checkDimension = (files) => {
    const reader = new FileReader();

    //Read the contents of Image File.
    reader.readAsDataURL(files[0]);
    reader.onload = function (e) {
      //Initiate the JavaScript Image object.
      const image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;

      //Validate the File Height and Width.
      image.onload = function () {
        const height = this.height;
        const width = this.width;
        if(height > 200 || width > 80){

        } else if(height > 80 && width > 200) {

        }
        console.log('Image Height: ' + height + ' Width: ' + width);
      };
    };
  };

  const handleFileChange = (e) => {
    console.log('e', e.target.files);
    if (e.target.files) {
      checkDimension(e.target.files);
      // handleImageUpload(e.target.files);
    }
  };

  const handleSaveImage = () => {
    // saveImage(imgData.src);
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
            {source !== 'modal' && (
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
        {source === 'modal' ? (
          <ImageContainer {...imagesData[0]} />
        ) : (
          imagesData.map((image, key) => (
            <ImageContainer key={`image-${key}`} {...image} />
          ))
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
