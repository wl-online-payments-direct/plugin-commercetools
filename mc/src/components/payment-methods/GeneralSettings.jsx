import React from 'react';
import './style.css';
import ToggleInput from '@commercetools-uikit/toggle-input';
import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';
import TextInput from '@commercetools-uikit/text-input';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@commercetools-uikit/tooltip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DownloadIcon } from '@commercetools-uikit/icons';

const GeneralSettings = ({ state, handleCommonSettings }) => {
  return (
    <>
      <div className="section-wrapper">
        <h5 className="section-header">
          {state.paymentOption.label}
          <Tooltip placement="top" title={state.paymentOption.tooltip}>
            <InfoIcon />
          </Tooltip>
        </h5>
        <div className="options-section">
          <RadioField
            name="payment-option"
            title="payment-option"
            value={state.paymentOption.value}
            onChange={(e) =>
              handleCommonSettings('paymentOption', e.target.value)
            }
            direction="inline"
          >
            <RadioInput.Option value={'1'}>{'Direct Sale'}</RadioInput.Option>
            <RadioInput.Option value={'2'}>
              {'Authorization only'}
            </RadioInput.Option>
          </RadioField>
        </div>
      </div>
      {state.paymentOption.value === '2' && (
        <div className="section-wrapper flex">
          <div className="section-wrapper">
            <h5 className="section-header">
              {state.authorizationPaymentOption.label}
            </h5>
            <div className="options-section">
              <RadioField
                name="authorization-payment-option"
                title="authorization-payment-option"
                value={state.authorizationPaymentOption.value}
                onChange={(e) =>
                  handleCommonSettings(
                    'authorizationPaymentOption',
                    e.target.value
                  )
                }
                direction="inline"
              >
                <RadioInput.Option value={'1'}>
                  {'Pre Authorization'}
                </RadioInput.Option>
                <RadioInput.Option value={'2'}>
                  {'Final Authorization'}
                </RadioInput.Option>
              </RadioField>
            </div>
          </div>
          <div className="section-wrapper">
            <h5 className="section-header">
              {state.captureConfiguration.label}
            </h5>
            <div className="dropdown-container">
              <Select
                className="select-dropdown"
                value={state.captureConfiguration.value}
                validation={state.captureConfiguration.validation}
                type={state.captureConfiguration.type}
                onChange={(e) =>
                  handleCommonSettings('captureConfiguration', e.target.value)
                }
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {state.captureConfiguration.values &&
                  Object.keys(state.captureConfiguration.values).map(
                    (lang, index) => (
                      <MenuItem key={`lang${index}`} value={lang}>
                        {state.captureConfiguration.values[lang]}
                      </MenuItem>
                    )
                  )}
              </Select>
            </div>
          </div>
        </div>
      )}
      <div className="section-wrapper">
        <h5 className="section-header">{state.placeOrder.label}</h5>
        <div className="template-section flex">
          <TextInput
            className="section-input"
            value={state.placeOrder.value}
            validation={state.placeOrder.validation}
            type={state.placeOrder.type}
            onChange={(e) => handleCommonSettings('placeOrder', e.target.value)}
          />
          <div className="dropdown-container">
            <Select
              className="select-dropdown"
              value={state.placeOrderLanguage.value}
              validation={state.placeOrderLanguage.validation}
              type={state.placeOrderLanguage.type}
              onChange={(e) =>
                handleCommonSettings('placeOrderLanguage', e.target.value)
              }
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {state.placeOrderLanguage.values &&
                state.placeOrderLanguage.values.map((lang, index) => (
                  <MenuItem key={`lang${index}`} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="section-wrapper">
        <div className="advanced-loging flex">
          <h5 className="section-header">{state.advancedLogging.label}</h5>
          <ToggleInput
            size={'small'}
            isDisabled={false}
            value={state.advancedLogging.value}
            isChecked={state.advancedLogging.value}
            onChange={(e) =>
              handleCommonSettings('advancedLogging', e.target.checked)
            }
          />
          {state.advancedLogging.value && (
            <DownloadIcon style={{ margin: 'auto' }} />
          )}
        </div>
      </div>
      <div className="section-wrapper">
        <div className="force-s3sv2 flex mb-2">
          <h5 className="section-header">{state.force3DSv2.label}</h5>
          <ToggleInput
            size={'small'}
            isDisabled={false}
            value={state.force3DSv2.value}
            isChecked={state.force3DSv2.value}
            onChange={(e) =>
              handleCommonSettings('force3DSv2', e.target.checked)
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
