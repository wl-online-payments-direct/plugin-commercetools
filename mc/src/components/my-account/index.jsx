import React, { useState, useEffect, useContext } from 'react';
import Link from '@commercetools-uikit/link';
import { PageContentWide } from '@commercetools-frontend/application-components';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import SelectInput from '@commercetools-uikit/select-input';
import Label from '@commercetools-uikit/label';
import TextInput from '@commercetools-uikit/text-input';
import NumberInput from '@commercetools-uikit/number-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import './style.css';
import PageWrapper from '../page-wrapper';
import Spacings from '@commercetools-uikit/spacings';
import worldlineLogo from '../../assets/worldline-logo-main.png';
import worldlineLogoBottom from '../../assets/worldline-logo-bottom.png';
import { ClipboardIcon } from '@commercetools-uikit/icons';
import { PaymentContext } from '../../context/payment';
import RequestNewFeature from '../request-new-feature';
import dataFields from './dataFields.json';
import Typography from '@mui/material/Typography';

const MyAccount = (props) => {
  const { setLoader, saveCustomObject, customObject, checkConnection } =
    useContext(PaymentContext);

  const [selectedOption, setSelectedOption] = useState('test');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(dataFields[selectedOption]);
  const {
    signUpLink,
    documentationLink,
    contactSalesLink,
    contactSupportLink,
  } = useApplicationContext((context) => context.environment);
  useEffect(() => {
    if (customObject?.value) {
      const custValue = customObject?.value[selectedOption];
      setFormData((prevData) => {
        const payload = {};
        for (let pData of Object.keys(prevData)) {
          if (
            ['webhookUrl', 'redirectSuccessUrl', 'redirectFailureUrl'].includes(
              pData
            )
          ) {
            payload[pData] = {
              ...prevData[pData],
              value:
                customObject?.value[pData] !== undefined
                  ? customObject?.value[pData]
                  : prevData[pData].value,
            };
          } else {
            payload[pData] = {
              ...prevData[pData],
              value:
                custValue[pData] !== undefined
                  ? custValue[pData]
                  : prevData[pData].value,
            };
          }
        }
        return payload;
      });
    } else {
      setFormData(dataFields[selectedOption]);
    }
    setCopied(false);
  }, [selectedOption]);

  useEffect(() => {
    if (customObject?.value) {
      const custValue = customObject?.value[selectedOption];
      setFormData((prevData) => {
        const payload = {};
        for (let pData of Object.keys(prevData)) {
          if (
            ['webhookUrl', 'redirectSuccessUrl', 'redirectFailureUrl'].includes(
              pData
            )
          ) {
            payload[pData] = {
              ...prevData[pData],
              value:
                customObject?.value[pData] !== undefined
                  ? customObject?.value[pData]
                  : prevData[pData].value,
            };
          } else {
            payload[pData] = {
              ...prevData[pData],
              value:
                custValue[pData] !== undefined
                  ? custValue[pData]
                  : dataFields[selectedOption][pData].value,
            };
          }
        }
        return payload;
      });
    }
  }, [customObject]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: {
          ...prevData[name],
          value: name === 'timeOut' ? parseInt(value) : value,
          hasError: false,
        },
      };
    });
  };

  const handleSubmit = async () => {
    const payload = { ...customObject };
    const formPayload = {};
    for (let pData of Object.keys(formData)) {
      if (pData === 'merchantId') {
        formPayload[pData] = {
          ...formData[pData],
          hasError:
            !formData[pData].disabled &&
            (formData[pData].value.length === 0 ||
              formData[pData].value.length > 256),
          errMsg:
            formData[pData].value.length === 0
              ? 'Please fill out this field'
              : formData[pData].value.length > 256
              ? 'Maximum character limit is 256'
              : '',
        };
      } else if (pData === 'timeOut') {
        formPayload[pData] = {
          ...formData[pData],
          hasError:
            !formData[pData].disabled &&
            (formData[pData].value < 1 || formData[pData].value > 1440),
          errMsg:
            formData[pData].value < 1
              ? 'Minimum timeout is 1'
              : formData[pData].value > 256
              ? 'Maximum timeout is 1440'
              : '',
        };
      } else {
        formPayload[pData] = {
          ...formData[pData],
          hasError:
            !formData[pData].disabled && formData[pData].value.length === 0,
          errMsg:
            formData[pData].value.length === 0
              ? 'Please fill out this field'
              : '',
        };
      }
    }
    setFormData(formPayload);

    if (Object.keys(formPayload).some((data) => formPayload[data].hasError)) {
      return;
    } else {
      setLoader(true);
      const conPayload = {
        merchantId: formData['merchantId'].value,
        integrator: formData['integrator'].value,
        apiKey: formData['apiKey'].value,
        apiSecret: formData['apiSecret'].value,
        host: formData['host'].value,
      };
      const result = await checkConnection(conPayload);
      if (result?.connection) {
        for (let fData of Object.keys(formData)) {
          if (
            ['webhookUrl', 'redirectSuccessUrl', 'redirectFailureUrl'].includes(
              fData
            )
          ) {
            payload.value = {
              ...payload.value,
              [fData]: formData[fData].value?.trim(),
            };
          } else {
            payload.value[selectedOption] = {
              ...payload.value[selectedOption],
              [fData]:
                fData === 'timeOut'
                  ? formData[fData].value
                  : formData[fData].value?.trim(),
            };
          }
        }
        await saveCustomObject(payload);
      } else {
        setLoader(false);
      }
    }
  };

  return (
    <>
      <PageWrapper title={'My Account'}>
        <PageContentWide columns="1/1">
          <div id="left-div">
            <div className="logo-section">
              <div className="logo-container">
                <div className="logo-wrapper">
                  <h1 className="welcome-title">Welcome!</h1>
                  <img
                    src={worldlineLogo}
                    alt="worldline-logo"
                    className="worldline-logo"
                  />
                </div>
                <p className="welcome-description">
                  Experience a seamless and efficient checkout process in just a
                  matter of minutes.
                </p>
              </div>
              <div className="bottom-section">
                <div className="contact-section">
                  <div className="contact-wrapper">
                    <Label>Test account creation : </Label>
                    <Link
                      className="external-link"
                      isExternal={true}
                      to={signUpLink}
                    >
                      {signUpLink}
                    </Link>
                  </div>
                  <div className="contact-wrapper">
                    <Label>Documentation : </Label>
                    <Link
                      className="external-link"
                      isExternal={true}
                      to={documentationLink}
                    >
                      {documentationLink}
                    </Link>
                  </div>
                  <div className="contact-wrapper">
                    <Label>Contact sales team : </Label>
                    <Link
                      className="external-link"
                      isExternal={true}
                      to={contactSalesLink}
                    >
                      {contactSalesLink}
                    </Link>
                  </div>
                  <div className="contact-wrapper">
                    <Label>Contact support teams : </Label>
                    <Link
                      className="external-link"
                      isExternal={true}
                      to={contactSupportLink}
                    >
                      {contactSupportLink}
                    </Link>
                  </div>
                </div>
                <div className="logo-bottom-container">
                  <p>Also available for</p>
                  <img src={worldlineLogoBottom} />
                </div>
              </div>
              <RequestNewFeature />
            </div>
          </div>
          <div id="right-div">
            <div className="link-wrapper">
              <Link className="external-link" isExternal={true} to={signUpLink}>
                Sign Up
              </Link>
              <Link
                className="external-link"
                isExternal={true}
                to={contactSupportLink}
              >
                Contact Us
              </Link>
            </div>
            <div className="form-wrapper">
              <h1 className="connect-title">Connect to Worldline</h1>
              <div className="myaccount-form">
                <Spacings.Stack scale="m">
                  <Label isBold={true}>
                    <p className="form-label">Checkout types</p>
                  </Label>
                  <SelectInput
                    name="form-field-name"
                    value={selectedOption}
                    onChange={handleChange}
                    options={[
                      { value: 'test', label: 'Test Mode' },
                      { value: 'live', label: 'Live Mode' },
                    ]}
                  />
                  {Object.keys(formData).map((key, i) => {
                    const formField = formData[key];
                    return (
                      <div key={`Data-field-${i}`}>
                        <Label isBold={true}>
                          <p className="form-label">{formField.label}</p>
                          {formField.required && !formField.disabled ? (
                            <p className="required">*</p>
                          ) : null}
                        </Label>
                        <div>
                          {formField.hasError ? (
                            <div className="error-msg">
                              <Typography>{formField.errMsg}</Typography>
                            </div>
                          ) : null}
                        </div>
                        {formField.type === 'text' ? (
                          key === 'webhookUrl' ? (
                            <>
                              <div className="flex">
                                <TextInput
                                  name={key}
                                  placeholder={formField.placeholder}
                                  value={formField.value}
                                  isReadOnly={formField.disabled}
                                  onChange={handleInputChange}
                                  hasError={formField.hasError}
                                />
                                {formField.value && formField.value.length && (
                                  <ClipboardIcon
                                    style={{ margin: 'auto' }}
                                    onClick={() => {
                                      setCopied(true);
                                      navigator.clipboard.writeText(
                                        formField.value
                                      );
                                    }}
                                  />
                                )}
                              </div>
                              <div
                                className="flex"
                                style={{ justifyContent: 'space-between' }}
                              >
                                <p className="info">
                                  To avoid copy/paste issues, use the `copy`
                                  icon to copy the URL
                                </p>
                                {copied && <p>Copied!</p>}
                              </div>
                            </>
                          ) : (
                            <TextInput
                              name={key}
                              placeholder={formField.placeholder}
                              value={formField.value}
                              isReadOnly={formField.disabled}
                              onChange={handleInputChange}
                              hasError={formField.hasError}
                            />
                          )
                        ) : (
                          <NumberInput
                            name={key}
                            placeholder={formField.placeholder}
                            value={formField.value}
                            onChange={handleInputChange}
                            hasError={formField.hasError}
                          />
                        )}
                      </div>
                    );
                  })}
                  <PrimaryButton
                    label="Save/Update"
                    onClick={handleSubmit}
                    isDisabled={false}
                  />
                </Spacings.Stack>
              </div>
            </div>
          </div>
        </PageContentWide>
      </PageWrapper>
    </>
  );
};
MyAccount.displayName = 'MyAccount';

export default MyAccount;
