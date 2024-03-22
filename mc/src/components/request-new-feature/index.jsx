import React, { useContext, useState, useEffect } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { CloseIcon, RocketIcon } from '@commercetools-uikit/icons';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import Label from '@commercetools-uikit/label';
import TextInput from '@commercetools-uikit/text-input';
import NumberInput from '@commercetools-uikit/number-input';
import RichTextInput from '@commercetools-uikit/rich-text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { PaymentContext } from '../../context/payment';
import { Modal, Box, Button } from '@mui/material';
import './style.css';
import { useIntl } from 'react-intl';
import messages from './messages';

const RequestNewFeature = () => {
  const [disableSendRequest, setDisableSendRequest] = useState(true);
  const [openModal, setOpenmodal] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => setOpenmodal(false);
  const { pluginVersion } = useApplicationContext(
    (context) => context.environment
  );
  const { formatMessage } = useIntl();

  const { sendRequest, setLoader, activeStore } = useContext(PaymentContext);
  const dataForm = [
    {
      name: 'pspId',
      label: 'PSPID',
      placeholder: 'Enter the PSPID',
      type: 'text',
      tooltip: 'The identifier of your Worldline account',
      value: '',
    },
    {
      name: 'companyName',
      label: 'Company Name',
      placeholder: 'Enter the company name',
      type: 'text',
      tooltip: 'Your company name',
      value: '',
    },
    {
      name: 'message',
      label: 'Message',
      placeholder: 'Enter the message',
      type: 'multiline',
      tooltip: 'Please explain how our payment plugin can be further improved',
      value: '',
    },
    {
      name: 'pluginVersion',
      label: 'Plugin Version',
      value: `${pluginVersion}`,
      type: 'preset',
    },
  ];
  const [requestForm, setRequestForm] = useState(dataForm);

  const clearRequestForm = () => {
    setRequestForm((requestForm) =>
      requestForm.map((form) => {
        return {
          ...form,
          value: form.name !== 'pluginVersion' ? '' : pluginVersion,
        };
      })
    );
  };

  const sendRequestForm = async () => {
    setLoader(true);
    const payload = {
      storeId: activeStore?.key,
    };
    for (const data of requestForm) {
      payload[data.name] = data.value;
    }
    const res = await sendRequest(payload);
    setLoader(false);
    clearRequestForm();
    handleCloseModal();
  };

  const cancelRequest = () => {
    clearRequestForm();
    handleCloseModal();
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
            placeholder={formatMessage(messages[`${field.name}Placeholder`])}
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
            placeholder={formatMessage(messages[`${field.name}Placeholder`])}
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
            placeholder={formatMessage(messages[`${field.name}Placeholder`])}
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
          <div className="web-form">
            <h5 className="section-header">
              {formatMessage(messages.requestNewFeatureTitle)}
            </h5>
            <div className="server-request-wrapper">
              {requestForm.map((field, index) => (
                <div
                  className="modal-form--wrapper"
                  key={`request-form-field-${index}`}
                >
                  <span className="form-title">
                    <div className="flex">
                      <Label isRequiredIndicatorVisible={true}>
                        {formatMessage(messages[field.name])}
                      </Label>
                      {field.tooltip ? (
                        <Tooltip
                          placement="top"
                          title={formatMessage(
                            messages[`${field.name}Tooltip`]
                          )}
                        >
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
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color="inherit" onClick={cancelRequest} sx={{ mr: 1 }}>
                {formatMessage(messages.cancelBtn)}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <PrimaryButton
                className="sendBtn"
                isDisabled={disableSendRequest}
                iconLeft={<RocketIcon />}
                label={formatMessage(messages.sendBtn)}
                onClick={sendRequestForm}
              />
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RequestNewFeature;
