import React, { useContext, useState, useEffect } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import {
  CloseIcon,
  RocketIcon,
  InfoIcon,
  ArrowRightIcon,
} from '@commercetools-uikit/icons';
import Tooltip from '@commercetools-uikit/tooltip';
import Label from '@commercetools-uikit/label';
import TextInput from '@commercetools-uikit/text-input';
import NumberInput from '@commercetools-uikit/number-input';
import RichTextInput from '@commercetools-uikit/rich-text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { PaymentContext } from '../../context/payment';
import { Stepper, Step, StepLabel, Modal, Box, Button } from '@mui/material';
import './style.css';
import dataForm from './dataForm.json';

const RequestNewFeature = () => {
  const steps = ['Configure server', 'Request new feature'];

  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [disableSaveServer, setDisableSaveServer] = useState(true);
  const [disableSendRequest, setDisableSendRequest] = useState(true);
  const [openModal, setOpenmodal] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => setOpenmodal(false);
  const { pluginVersion } = useApplicationContext(
    (context) => context.environment
  );

  const { sendRequest, saveCustomObject, customObject, setLoader } =
    useContext(PaymentContext);

  const [serverForm, setServerForm] = useState(dataForm.serverForm);
  const [requestForm, setRequestForm] = useState(dataForm.requestForm);

  useEffect(() => {
    if (customObject?.value.serverConfig) {
      setServerForm(() => {
        return dataForm.serverForm.map((data) => {
          return {
            ...data,
            value: customObject?.value.serverConfig[data.name],
          };
        });
      });
    } else {
      resetServerForm();
    }
  }, [customObject]);

  const resetServerForm = () => {
    if (customObject?.value.serverConfig) {
      setServerForm(() => {
        return dataForm.serverForm.map((data) => {
          return {
            ...data,
            value: customObject?.value?.serverConfig[data.name],
          };
        });
      });
    } else
      setServerForm((serverForm) =>
        serverForm.map((form) => {
          return { ...form, value: null };
        })
      );
  };

  const clearRequestForm = () => {
    setRequestForm((requestForm) =>
      requestForm.map((form) => {
        return { ...form, value: '' };
      })
    );
  };

  const resetRequestForm = () => {
    setRequestForm(() =>
      requestForm.map((rForm) => {
        if (rForm.name === 'pluginVersion')
          return { ...rForm, value: `${pluginVersion}` };
        else return { ...rForm, value: '' };
      })
    );
  };

  const handleNext = () => {
    resetRequestForm();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const saveServerForm = async () => {
    const serverConfig = {};
    for (const data of serverForm) {
      serverConfig[data.name] = data.value;
    }
    if (
      customObject?.value?.serverConfig === undefined ||
      JSON.stringify(serverConfig) !==
        JSON.stringify(customObject?.value?.serverConfig)
    ) {
      setLoader(true);
      const payload = {
        ...customObject,
        value: {
          ...customObject.value,
          serverConfig: serverConfig,
        },
      };
      await saveCustomObject(payload);
      handleNext();
    } else {
      handleNext();
    }
  };

  const sendRequestForm = async () => {
    setLoader(true);
    const payload = {};
    for (const data of requestForm) {
      payload[data.name] = data.value;
    }
    const res = await sendRequest(payload);
    setLoader(false);
    resetServerForm();
    clearRequestForm();
    handleCloseModal();
    setActiveStep(0);
  };

  const cancelRequest = () => {
    resetServerForm();
    clearRequestForm();
    handleCloseModal();
    setActiveStep(0);
  };

  const updateServerForm = (e) => {
    setServerForm(() => {
      return serverForm.map((data) => {
        if (data.name === e.target.name) {
          return {
            ...data,
            value: e.target.value,
          };
        } else {
          return data;
        }
      });
    });
  };

  const updateRequestForm = (e, name) => {
    setRequestForm(() => {
      return requestForm.map((data) => {
        if (data.name === e.target.name || name === data.name) {
          return {
            ...data,
            value: e.target.value,
          };
        } else {
          return data;
        }
      });
    });
  };

  useEffect(() => {
    if (
      serverForm.every(
        (ele) =>
          ele.value !== null &&
          ((ele.type !== 'number' && ele.value.length !== 0) ||
            (ele.type === 'number' && ele.value > 0))
      )
    )
      setDisableSaveServer(false);
    else setDisableSaveServer(true);
  }, [serverForm]);

  useEffect(() => {
    if (
      requestForm.every(
        (ele) =>
          ele.value !== null &&
          ((ele.type !== 'number' && ele.value.length !== 0) ||
            (ele.type === 'number' && ele.value > 0))
      )
    )
      setDisableSendRequest(false);
    else setDisableSendRequest(true);
  }, [requestForm]);

  const renderField = (field, flag) => {
    switch (field.type) {
      case 'text':
      case 'url':
      case 'email':
        return (
          <TextInput
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) =>
              flag === 'server' ? updateServerForm(e) : updateRequestForm(e)
            }
            className="webform-input"
          />
        );
      case 'number':
        return (
          <NumberInput
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) =>
              flag === 'server' ? updateServerForm(e) : updateRequestForm(e)
            }
            className="webform-input"
          />
        );
      case 'multiline':
        return (
          <RichTextInput
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) =>
              flag === 'server'
                ? updateServerForm(e)
                : updateRequestForm(e, field.name)
            }
            className="webform-input"
          />
        );
      case 'preset':
        return (
          <TextInput
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            isReadOnly={true}
            className="webform-input"
          />
        );
    }
  };

  return (
    <div style={{ zIndex: 1 }}>
      <div className="request-feature-wrapper">
        <SecondaryButton
          label={'Request New Feature'}
          onClick={handleOpenModal}
        />
      </div>
      <Modal
        open={openModal}
        onClose={cancelRequest}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="web-form-wrapper"
      >
        <Box className="web-form-modal">
          <span className="close-button" onClick={cancelRequest}>
            <CloseIcon />
          </span>
          <Stepper activeStep={activeStep} className="stepper-wrapper">
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div className="web-form">
            <h5 className="section-header"></h5>
            {activeStep === 0 ? (
              <div className="server-request-wrapper">
                {serverForm.map((field, index) => (
                  <div
                    className="modal-form--wrapper"
                    key={`server-form-field-${index}`}
                  >
                    <span className="form-title">
                      <div className="flex">
                        <Label isRequiredIndicatorVisible={true}>
                          {field.label}
                        </Label>
                        {field.tooltip ? (
                          <Tooltip placement="top" title={field.tooltip}>
                            <InfoIcon />
                          </Tooltip>
                        ) : null}
                      </div>
                    </span>
                    <span className="form-entry">
                      {renderField(field, 'server')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="server-request-wrapper">
                {requestForm.map((field, index) => (
                  <div
                    className="modal-form--wrapper"
                    key={`request-form-field-${index}`}
                  >
                    <span className="form-title">
                      <div className="flex">
                        <Label isRequiredIndicatorVisible={true}>
                          {field.label}
                        </Label>
                        {field.tooltip ? (
                          <Tooltip placement="top" title={field.tooltip}>
                            <InfoIcon />
                          </Tooltip>
                        ) : null}
                      </div>
                    </span>
                    <span className="form-entry">
                      {renderField(field, 'request')}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === 0 ? (
                <PrimaryButton
                  iconLeft={<ArrowRightIcon />}
                  isDisabled={disableSaveServer}
                  label="Save and Proceed"
                  onClick={saveServerForm}
                />
              ) : (
                <PrimaryButton
                  isDisabled={disableSendRequest}
                  iconLeft={<RocketIcon />}
                  label="Send"
                  onClick={sendRequestForm}
                />
              )}
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RequestNewFeature;
