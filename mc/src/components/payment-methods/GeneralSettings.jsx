import React, { useState, useEffect } from 'react';
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

const GeneralSettings = ({ state, handleCommonSettings }) => {
  const [merchREfError, setmerchRefError] = useState(
    state.merchantReference.value?.replaceAll(' ', '').length > 12
      ? true
      : false
  );
  useEffect(() => {
    setmerchRefError(
      state.merchantReference.value?.replaceAll(' ', '').length > 12
        ? true
        : false
    );
  }, [state.merchantReference.value]);

  return (
    <>
      <div className="section-wrapper">
        <h5 className="section-header">
          <span className="header-section-title">
            {state.merchantReference.label}
          </span>
          <Tooltip placement="top" title={state.merchantReference.tooltip}>
            <InfoIcon />
          </Tooltip>
        </h5>
        <div className="template-section">
          {merchREfError && (
            <div style={{ margin: '10px' }}>
              <Alert severity="error">{'Maximum 12 characters.'}</Alert>
            </div>
          )}
          <TextInput
            className="section-input"
            value={
              state.merchantReference.value ? state.merchantReference.value : ''
            }
            type={state.merchantReference.type}
            placeholder={state.merchantReference.placeholder}
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
            {state.paymentOption.label}
          </span>
          <Tooltip placement="top" title={state.paymentOption.tooltip}>
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
              {'Direct Sale'}
            </RadioInput.Option>
            <RadioInput.Option value={'AUTH'}>
              {'Authorization only'}
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
                  {'Pre Authorization'}
                </RadioInput.Option>
                <RadioInput.Option value={'FINAL_AUTHORIZATION'}>
                  {'Final Authorization'}
                </RadioInput.Option>
              </RadioField>
            </div>
          </div>
          <div className="section-wrapper">
            <h5 className="section-header">
              {state.captureAuthorizationMode.label}
            </h5>
            <div className="dropdown-container">
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
        <h5 className="section-header">{state.placeOrder.label}</h5>
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
          <h5 className="section-header">{state.enableLogs.label}</h5>
          <ToggleInput
            size={'small'}
            isDisabled={false}
            isChecked={state.enableLogs.value}
            onChange={(e) =>
              handleCommonSettings('enableLogs', e.target.checked)
            }
          />
          {state.enableLogs.value && (
            <DownloadIcon style={{ margin: 'auto' }} />
          )}
        </div>
      </div>
      <div className="section-wrapper">
        <div className="force-s3sv2 flex mb-2">
          <h5 className="section-header">
            {state.skip3dsAuthentication.label}
          </h5>
          <ToggleInput
            size={'small'}
            isDisabled={false}
            isChecked={state.skip3dsAuthentication.value}
            onChange={(e) =>
              handleCommonSettings('skip3dsAuthentication', e.target.checked)
            }
          />
        </div>
      </div>
      <div className="section-wrapper">
        <div className="colorpicker-section">
          <div className="colorpicker-container flex mb-2">
            <input
              type={state.bgColor.type}
              name="bg_color"
              value={state.bgColor.value}
              title={state.bgColor.label}
              onChange={(e) => handleCommonSettings('bgColor', e.target.value)}
            />
            <h5 className="colorpicker-title">{state.bgColor.label}</h5>
          </div>
          <div className="colorpicker-container flex mb-2">
            <input
              type={state.textColor.type}
              name="text_color"
              value={state.textColor.value}
              title={state.textColor.label}
              onChange={(e) =>
                handleCommonSettings('textColor', e.target.value)
              }
            />
            <h5 className="colorpicker-title">{state.textColor.label}</h5>
          </div>
          <div className="colorpicker-container flex mb-2">
            <input
              type={state.outlineColor.type}
              name="bg_color"
              value={state.outlineColor.value}
              title={state.outlineColor.label}
              onChange={(e) =>
                handleCommonSettings('outlineColor', e.target.value)
              }
            />
            <h5 className="colorpicker-title">{state.outlineColor.label}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralSettings;
