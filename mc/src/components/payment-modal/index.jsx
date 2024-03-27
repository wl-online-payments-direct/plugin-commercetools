import React, { useState, useContext, useEffect, useRef } from 'react';
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
import Label from '@commercetools-uikit/label';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextInput from '@commercetools-uikit/text-input';
import NumberInput from '@commercetools-uikit/number-input';
import { useIntl } from 'react-intl';
import messages from './messages';

const PaymentModalComponent = ({
  images = [],
  label = '',
  source,
  saveImage,
  handleClose,
  handlePaymentFieldsUpdate,
  paymentProductId,
  paymentOption,
  recurrenceType,
  signatureType,
}) => {
  const inputRef = useRef(null);
  const { formatMessage } = useIntl();
  const [imagesData, setImagesData] = useState([...new Set(images)]);
  const [paymentFields, setPaymentFields] = useState(() => {
    switch (label) {
      case 'Oney3x4x':
        return [
          {
            label: formatMessage(messages.oneyPaymentOption),
            type: 'text',
            value: paymentOption ? paymentOption : '',
            key: 'paymentOption',
            required: true,
            hasError: false,
            errMsg: formatMessage(messages.oneyPaymentOptionErrorMsg),
          },
        ];
      case 'Intersolve':
        return [
          {
            label: formatMessage(messages.intersolvePaymentProductID),
            type: 'number',
            value: paymentProductId ? paymentProductId : 0,
            key: 'paymentProductId',
            required: true,
            hasError: false,
            errMsg: formatMessage(messages.intersolvePaymentProductIDErrorMsg),
          },
        ];
      case 'SepaDirectDebit':
        return [
          {
            label: formatMessage(messages.sepaReccurenceType),
            type: 'dropdown',
            value: recurrenceType ? recurrenceType : 'UNIQUE',
            values: ['UNIQUE', 'RECURRING'],
            key: 'recurrenceType',
            required: true,
            hasError: false,
            errMsg: formatMessage(messages.sepaReccurenceTypeErrorMsg),
          },
          {
            label: formatMessage(messages.sepaSignatureType),
            type: 'dropdown',
            value: signatureType ? signatureType : 'SMS',
            values: ['SMS', 'UNSIGNED'],
            key: 'signatureType',
            required: true,
            hasError: false,
            errMsg: formatMessage(messages.sepaSignatureTypeErrorMsg),
          },
        ];
      default:
        return null;
    }
  });
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

  const resetInputElement = () => {
    if (inputRef && inputRef?.current) {
      inputRef.current.value = null;
    }
  };

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
      resetInputElement();
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

  const handleSavePaymentOption = () => {
    if (paymentFields && paymentFields.length > 0) {
      const newDataSet = paymentFields.map((fields) => {
        if (
          (fields.type === 'number' &&
            (fields.value <= 0 || isNaN(parseFloat(fields.value)))) ||
          (fields.type === 'text' && fields.value === '')
        ) {
          return {
            ...fields,
            hasError: true,
          };
        } else {
          return { ...fields };
        }
      });
      if (newDataSet.some((data) => data.hasError)) {
        setPaymentFields(newDataSet);
        return;
      } else {
        handlePaymentFieldsUpdate(newDataSet, imagesData[0]);
        setDimError(false);
        handleClose(false);
      }
    } else {
      saveImage(imagesData[0]);
      setDimError(false);
      handleClose(false);
    }
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
    resetInputElement();
    const deleteIndex = imagesData.indexOf(deleteUrl);
    imagesData.splice(deleteIndex, 1);
    handleCloseModal();
  };

  const handlePaymentFieldChange = (dataObj, value) => {
    setPaymentFields((prevData) => {
      return prevData.map((fields) => {
        if (fields.label === dataObj.label) {
          return {
            ...fields,
            value: dataObj.type === 'number' ? parseInt(value) : value,
            hasError: false,
          };
        } else {
          return { ...fields };
        }
      });
    });
  };

  return (
    <>
      <div className="payment-modal-wrapper">
        <div className="logo-section-wrapper">
          <div className="logo-wrapper">
            {imagesData && imagesData.length > 0 ? (
              imagesData.map((image, key) => (
                <ImageContainer key={`image-${key}`} url={image} />
              ))
            ) : (
              <ImageIcon className="logo-placeholder" sx={{ opacity: 0.2 }} />
            )}
          </div>
          <div className="logo-upload">
            {dimError && (
              <div style={{ margin: '10px' }}>
                <Alert severity="error">
                  {formatMessage(messages.uploadFileErrorMsg)}
                </Alert>
              </div>
            )}
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              className="upload-btn"
            >
              {formatMessage(messages.uploadFile)}
              <input
                ref={inputRef}
                type="file"
                id="upload-file"
                className="hidden-input"
                onChange={handleFileChange}
                accept="image/png, image/gif, image/jpeg, image/svg, image/jpg"
                name="img-file"
              />
            </Button>
          </div>
        </div>
        {paymentFields && paymentFields.length > 0 && (
          <div className="payment-option-fields">
            <div className="payment-options-field-wrapper">
              {paymentFields.map((pField, index) => {
                switch (pField.type) {
                  case 'text':
                    return (
                      <div
                        className="field-wrapper flex"
                        key={`payment-options-text-${index}`}
                      >
                        <div
                          className="field-title"
                          style={{ marginTop: '20px' }}
                        >
                          <Label>{pField.label}</Label>
                          <h6>{`(${formatMessage(messages.mandatoryMsg)})`}</h6>
                          {pField.hasError ? (
                            <div className="error-msg">
                              <Typography>{pField.errMsg}</Typography>
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <TextInput
                            className="section-input"
                            value={pField.value}
                            hasError={pField.hasError}
                            onChange={(e) =>
                              handlePaymentFieldChange(
                                pField,
                                e.target.value?.trim()
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  case 'number':
                    return (
                      <div
                        className="field-wrapper flex"
                        key={`payment-options-number-${index}`}
                      >
                        <div
                          className="field-title"
                          style={{ marginTop: '10px' }}
                        >
                          <Label className="field-title">{pField.label}</Label>
                          <h6>{'(Mandatory Field)'}</h6>
                          {pField.hasError ? (
                            <div className="error-msg">
                              <Typography>{pField.errMsg}</Typography>
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <NumberInput
                            className="section-input"
                            value={pField.value}
                            hasError={pField.hasError}
                            onChange={(e) =>
                              handlePaymentFieldChange(pField, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    );
                  case 'dropdown':
                    return (
                      <div
                        className="field-wrapper flex"
                        key={`payment-options-dropdown-${index}`}
                      >
                        <div
                          className="field-title"
                          style={{ marginTop: '10px' }}
                        >
                          <Label className="field-title">{pField.label}</Label>
                        </div>
                        <div>
                          <Select
                            className="select-dropdown"
                            value={pField.value}
                            onChange={(e) =>
                              handlePaymentFieldChange(pField, e.target.value)
                            }
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            {pField.values.map((val, i) => (
                              <MenuItem
                                value={val}
                                key={`payment-options-dropdown-values-${i}`}
                              >
                                {val}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    );
                }
              })}
            </div>
          </div>
        )}
      </div>
      {source === 'modal' && (
        <div className="image-actions">
          <Button
            className="save-btn"
            variant="solid"
            onClick={() => handleSavePaymentOption()}
          >
            {formatMessage(messages.saveBtn)}
          </Button>
          <Button
            className="cancel-btn"
            variant="soft"
            onClick={() => {
              setDimError(false);
              handleClose(true);
            }}
          >
            {formatMessage(messages.cancelBtn)}
          </Button>
        </div>
      )}
      <Modal
        open={openModal}
        onClose={() => {
          handleCloseModal();
        }}
        aria-labelledby="delete-modal-title"
        aria-describedby="modal-modal-description"
        className="payment-logo-wrapper"
      >
        <Box className="popup-modal delete-modal">
          <span
            className="close-button"
            onClick={() => {
              handleCloseModal();
            }}
          >
            <CloseIcon />
          </span>
          <Typography id="delete-modal-title" variant="h6" component="h2">
            {'Do you want to delete the image ?'}
          </Typography>
          <div className="image-actions">
            <Button
              className="save-btn"
              variant="solid"
              onClick={() => {
                handleImageDelete();
              }}
            >
              {formatMessage(messages.yesBtn)}
            </Button>
            <Button
              className="cancel-btn"
              variant="soft"
              onClick={() => {
                handleCloseModal();
              }}
            >
              {formatMessage(messages.cancelBtn)}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default PaymentModalComponent;
