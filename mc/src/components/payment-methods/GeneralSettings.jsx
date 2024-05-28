import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import ToggleInput from '@commercetools-uikit/toggle-input';
import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';
import TextInput from '@commercetools-uikit/text-input';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DownloadIcon } from '@commercetools-uikit/icons';
import { useIntl } from 'react-intl';
import messages from './messages';
import { PaymentContext } from '../../context/payment';

const GeneralSettings = ({ state, handleCommonSettings }) => {
  const { downloadLog } = useContext(PaymentContext);

  const { formatMessage } = useIntl();

  const handleDownloadLog = () => {
    downloadLog();
  };

  return (
    <>
      <div className="section-wrapper">
        <h5 className="section-header">
          <span className="header-section-title">
            {formatMessage(messages.generalMerchantReferenceLabel)}
          </span>
          <Tooltip
            placement="top"
            title={formatMessage(messages.generalMerchantReferenceTooltip)}
          >
            <InfoIcon />
          </Tooltip>
        </h5>
        <div className="template-section">
          <TextInput
            className="section-input"
            value={
              state.merchantReference.value ? state.merchantReference.value : ''
            }
            type={state.merchantReference.type}
            placeholder={formatMessage(
              messages.generalMerchantReferencePlaceholder
            )}
            onChange={(e) =>
              handleCommonSettings('merchantReference', e.target.value)
            }
          />
        </div>
      </div>
      <div className="section-wrapper">
        <h5 className="section-header">
          <span className="header-section-title">
            {formatMessage(messages.generalPaymentOptionLabel)}
          </span>
          <Tooltip
            placement="top"
            title={formatMessage(messages.generalPaymentOptionTooltip)}
          >
            <InfoIcon />
          </Tooltip>
        </h5>
        <div className="options-section radio-field">
          <RadioField
            name="payment-option"
            title="payment-option"
            value={state.paymentOption.value}
            onChange={(e) =>
              handleCommonSettings('paymentOption', e.target.value)
            }
            direction="inline"
          >
            <RadioInput.Option value={'SALE'}>
              {formatMessage(messages.generalPaymentOptionsDirect)}
            </RadioInput.Option>
            <RadioInput.Option value={'AUTH'}>
              {formatMessage(messages.generalPaymentOptionsAuth)}
            </RadioInput.Option>
          </RadioField>
        </div>
      </div>
      {state.paymentOption.value === 'AUTH' && (
        <>
          <div className="section-wrapper payments-section-wrapper">
            <div className="options-section">
              <RadioField
                name="authorization-payment-option"
                value={state.authorizationMode.value}
                onChange={(e) =>
                  handleCommonSettings('authorizationMode', e.target.value)
                }
                direction="inline"
              >
                <RadioInput.Option value={'PRE_AUTHORIZATION'}>
                  {formatMessage(messages.generalPaymentOptionsPre)}
                  <Tooltip
                    placement="top"
                    title={formatMessage(
                      messages.generalPaymentOptionsPreTooltip
                    )}
                  >
                    <InfoIcon />
                  </Tooltip>
                </RadioInput.Option>
                <RadioInput.Option value={'FINAL_AUTHORIZATION'}>
                  {formatMessage(messages.generalPaymentOptionsFinal)}
                  <Tooltip
                    placement="top"
                    title={formatMessage(
                      messages.generalPaymentOptionsFinalTooltip
                    )}
                  >
                    <InfoIcon />
                  </Tooltip>
                </RadioInput.Option>
              </RadioField>
            </div>
          </div>
          <div className="section-wrapper">
            <h5 className="section-header">
              {formatMessage(messages.generalCaptureAuthorizationModeLabel)}
              <Tooltip
                placement="top"
                title={formatMessage(
                  messages.generalCaptureAuthorizationModeTooltip
                )}
              >
                <InfoIcon />
              </Tooltip>
            </h5>
            <div>
              <Select
                className="select-dropdown"
                value={state.captureAuthorizationMode.value}
                type={state.captureAuthorizationMode.type}
                onChange={(e) =>
                  handleCommonSettings(
                    'captureAuthorizationMode',
                    e.target.value
                  )
                }
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {state.captureAuthorizationMode.values &&
                  Object.keys(state.captureAuthorizationMode.values).map(
                    (lang, index) => (
                      <MenuItem key={`capture-${index}`} value={lang}>
                        {state.captureAuthorizationMode.values[lang]}
                      </MenuItem>
                    )
                  )}
              </Select>
            </div>
          </div>
        </>
      )}
      <div className="section-wrapper">
        <div className="debug-loging flex">
          <h5 className="section-header">
            {formatMessage(messages.generalenableLogsLabel)}
          </h5>
          <ToggleInput
            size={'small'}
            isDisabled={false}
            isChecked={state.enableLogs.value}
            onChange={(e) =>
              handleCommonSettings('enableLogs', e.target.checked)
            }
          />
          {state.enableLogs.value && (
            <span
              className="download-btn flex"
              onClick={() => handleDownloadLog()}
            >
              <DownloadIcon style={{ margin: 'auto' }} />
              <p className="download-title">{'Download Logs'}</p>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralSettings;
