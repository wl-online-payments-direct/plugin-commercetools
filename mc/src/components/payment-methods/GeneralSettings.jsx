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
import Alert from '@mui/material/Alert';
import { useIntl } from 'react-intl';
import messages from './messages';
import { PaymentContext } from '../../context/payment';

const GeneralSettings = ({ state, handleCommonSettings }) => {
  const { downloadLog } = useContext(PaymentContext);

  const [merchREfError, setmerchRefError] = useState(
    state.merchantReference.value?.replaceAll(' ', '').length > 12
      ? true
      : false
  );
  const { formatMessage } = useIntl();

  useEffect(() => {
    setmerchRefError(
      state.merchantReference.value?.replaceAll(' ', '').length > 12
        ? true
        : false
    );
  }, [state.merchantReference.value]);

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
          {merchREfError && (
            <div style={{ margin: '10px' }}>
              <Alert severity="error">
                {formatMessage(messages.generalMerchantReferenceErrMsg)}
              </Alert>
            </div>
          )}
          <TextInput
            className="section-input"
            value={
              state.merchantReference.value ? state.merchantReference.value : ''
            }
            type={state.merchantReference.type}
            placeholder={formatMessage(
              messages.generalMerchantReferencePlaceholder
            )}
            hasError={merchREfError}
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
        <div className="options-section">
          <RadioField
            name="payment-option"
            title=""
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
                </RadioInput.Option>
                <RadioInput.Option value={'FINAL_AUTHORIZATION'}>
                  {formatMessage(messages.generalPaymentOptionsFinal)}
                </RadioInput.Option>
              </RadioField>
            </div>
          </div>
          <div className="section-wrapper">
            <h5 className="section-header">
              {formatMessage(messages.generalCaptureAuthorizationModeLabel)}
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
        <h5 className="section-header">
          {formatMessage(messages.generalPlaceOrderLabel)}
        </h5>
        <div className="template-section flex">
          <TextInput
            className="section-input"
            value={state.placeOrder.value ? state.placeOrder.value : ''}
            type={state.placeOrder.type}
            onChange={(e) => handleCommonSettings('placeOrder', e.target.value)}
          />
          <div className="dropdown-container">
            <Select
              className="select-dropdown"
              value={state.placeOrderLanguage.value}
              type={state.placeOrderLanguage.type}
              onChange={(e) =>
                handleCommonSettings('placeOrderLanguage', e.target.value)
              }
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {state.placeOrderLanguage.values &&
                state.placeOrderLanguage.values.map((lang, index) => (
                  <MenuItem key={`placeOrderlang${index}`} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
            </Select>
          </div>
        </div>
      </div>
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
