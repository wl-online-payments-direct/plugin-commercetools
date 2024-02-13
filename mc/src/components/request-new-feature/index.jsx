import React, { useContext, useState } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { CloseIcon, RocketIcon, InfoIcon } from '@commercetools-uikit/icons';
import Tooltip from '@commercetools-uikit/tooltip';
import Label from '@commercetools-uikit/label';
import TextInput from '@commercetools-uikit/text-input';
import RichTextInput from '@commercetools-uikit/rich-text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Grid from '@commercetools-uikit/grid';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { PaymentContext } from '../../context/payment';
import './style.css';

const RequestNewFeature = () => {
  const [openModal, setOpenmodal] = useState(false);
  const handleOpenModal = () => setOpenmodal(true);
  const handleCloseModal = () => setOpenmodal(false);
  const version = useApplicationContext((context) => context.project.version);
  const [webForm, setWebform] = useState({
    pspid: '',
    companyName: '',
    message: '',
    platformVersion: `${version}`,
    pluginVersion: '',
  });
  const { sendRequest } = useContext(PaymentContext);

  const clearForm = () => {
    setWebform({
      pspid: '',
      companyName: '',
      message: '',
      platformVersion: `${version}`,
      pluginVersion: '',
    });
  };

  const handleSaveRequest = async () => {
    await sendRequest(webForm);
    clearForm();
    handleCloseModal();
  };

  const handleCancelRequest = () => {
    clearForm();
    handleCloseModal();
  };

  const updateWebform = (e, key) => {
    setWebform({
      ...webForm,
      [key]: e.target.value,
    });
  };

  return (
    <div>
      <div className="request-feature-wrapper">
        <SecondaryButton
          label={'Request New Feature'}
          onClick={handleOpenModal}
        />
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="web-form-wrapper"
      >
        <Box className="web-form-modal">
          <span className="close-button" onClick={handleCloseModal}>
            <CloseIcon />
          </span>
          <div className="web-form">
            <h5 className="section-header"></h5>
            <Grid
              gridGap="16px"
              gridAutoColumns="1fr"
              gridTemplateColumns="repeat(2, 1fr)"
            >
              <Grid.Item>
                <div className="field-wrapper">
                  <Label isRequiredIndicatorVisible={true}>{'PSPID'}</Label>
                  <Tooltip
                    placement="top"
                    title={'The identifier of your Worldline account'}
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>
              </Grid.Item>
              <Grid.Item>
                <TextInput
                  name="PSPID"
                  value={webForm.pspid}
                  onChange={(e) => updateWebform(e, 'pspid')}
                  className="webform-input"
                />
              </Grid.Item>
              <Grid.Item>
                <div className="field-wrapper">
                  <Label isRequiredIndicatorVisible={true}>
                    {'Company Name'}
                  </Label>
                  <Tooltip placement="top" title={'Your company name'}>
                    <InfoIcon />
                  </Tooltip>
                </div>
              </Grid.Item>
              <Grid.Item>
                <TextInput
                  name="CompanyName"
                  value={webForm.companyName}
                  onChange={(e) => updateWebform(e, 'companyName')}
                  className="webform-input"
                />
              </Grid.Item>

              <Grid.Item>
                <div className="field-wrapper">
                  <Label isRequiredIndicatorVisible={true}>{'Message'}</Label>
                  <Tooltip
                    placement="top"
                    title={
                      'Please explain how our payment plugin can be further improved.'
                    }
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>
              </Grid.Item>
              <Grid.Item>
                <RichTextInput
                  name="Message"
                  value={webForm.message}
                  onChange={(e) => updateWebform(e, 'message')}
                  className="webform-input"
                />
              </Grid.Item>
              <Grid.Item>
                <div className="field-wrapper">
                  <Label>{'Platform Version'}</Label>
                </div>
              </Grid.Item>
              <Grid.Item>
                <TextInput
                  name="PlatformVersion"
                  value={webForm.platformVersion}
                  className="webform-input"
                  isDisabled={true}
                />
              </Grid.Item>
              <Grid.Item>
                <div className="field-wrapper">
                  <Label>{'Plugin Version'}</Label>
                </div>
              </Grid.Item>
              <Grid.Item>
                <TextInput
                  name="PluginVersion"
                  value={webForm.pluginVersion}
                  isDisabled={true}
                  className="webform-input"
                />
              </Grid.Item>
              <Grid.Item>
                <div className="webform-action">
                  <PrimaryButton
                    iconLeft={<RocketIcon />}
                    label="Send"
                    onClick={handleSaveRequest}
                  />
                  <SecondaryButton
                    label="Cancel"
                    onClick={handleCancelRequest}
                  />
                </div>
              </Grid.Item>
              <Grid.Item></Grid.Item>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RequestNewFeature;
