import React, { useState, useEffect, useContext } from 'react';
import Link from '@commercetools-uikit/link';
import { PageContentWide } from '@commercetools-frontend/application-components';
import SelectInput from '@commercetools-uikit/select-input';
import Label from '@commercetools-uikit/label';
import TextInput from '@commercetools-uikit/text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import './style.css';
import PageWrapper from '../page-wrapper';
import Spacings from '@commercetools-uikit/spacings';
import worldlineLogo from '../../assets/worldline-logo-main.png';
import worldlineLogoBottom from '../../assets/worldline-logo-bottom.png';
import { ClipboardIcon } from '@commercetools-uikit/icons';
import { PaymentContext } from '../../context/payment';

const MyAccount = (props) => {
  const { setLoader, saveCustomObject, customObject } =
    useContext(PaymentContext);

  const [selectedOption, setSelectedOption] = useState('test');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    live: {
      merchantId: '',
      apiKey: '',
      apiSecret: '',
      webhookKey: '',
      webhookSecret: '',
    },
    test: {
      merchantId: '',
      apiKey: '',
      apiSecret: '',
      webhookKey: '',
      webhookSecret: '',
    },
    webhookUrl: '',
    redirectUrl: '',
  });

  useEffect(() => {
    if (customObject?.value) {
      for (const option of ['live', 'test']) {
        const optionData = customObject?.value[option];
        const updatedFormData = { ...formData };
        for (const key in optionData) {
          updatedFormData[option][key] = optionData[key];
        }
        setFormData(updatedFormData);
      }
    }
  }, [customObject]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      if (name === 'webhookUrl' || name === 'redirectUrl') {
        return {
          ...prevData,
          [name]: value,
        };
      } else {
        return {
          ...prevData,
          [selectedOption]: {
            ...prevData[selectedOption],
            [name]: value,
          },
        };
      }
    });
  };

  const handleSubmit = async () => {
    setLoader(true);
    const draft = {
      value: {
        ...customObject,
        webhookUrl: formData.webhookUrl,
        redirectUrl: formData.redirectUrl,
        ...(selectedOption === 'live'
          ? {
              live: {
                ...customObject.live,
                merchantId: formData[selectedOption].merchantId,
                apiKey: formData[selectedOption].apiKey,
                apiSecret: formData[selectedOption].apiSecret,
                webhookKey: formData[selectedOption].webhookKey,
                webhookSecret: formData[selectedOption].webhookSecret,
              },
            }
          : {
              live: {
                ...customObject.live,
                merchantId: formData['live'].merchantId,
                apiKey: formData['live'].apiKey,
                apiSecret: formData['live'].apiSecret,
                webhookKey: formData['live'].webhookKey,
                webhookSecret: formData['live'].webhookSecret,
              },
            }),
        ...(selectedOption === 'test'
          ? {
              test: {
                ...customObject.test,
                merchantId: formData[selectedOption].merchantId,
                apiKey: formData[selectedOption].apiKey,
                apiSecret: formData[selectedOption].apiSecret,
                webhookKey: formData[selectedOption].webhookKey,
                webhookSecret: formData[selectedOption].webhookSecret,
              },
            }
          : {
              test: {
                ...customObject.test,
                merchantId: formData['test'].merchantId,
                apiKey: formData['test'].apiKey,
                apiSecret: formData['test'].apiSecret,
                webhookKey: formData['test'].webhookKey,
                webhookSecret: formData['test'].webhookSecret,
              },
            }),
      },
    };
    await saveCustomObject(draft);
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
              <div className="logo-bottom-container">
                <p>Also available for</p>
                <img src={worldlineLogoBottom} />
              </div>
            </div>
          </div>
          <div id="right-div">
            <div className="link-wrapper">
              <Link
                className="external-link"
                isExternal={true}
                to={'https://signup.direct.preprod.worldline-solutions.com/'}
              >
                Sign Up
              </Link>
              <Link
                className="external-link"
                isExternal={true}
                to={
                  'https://docs.direct.worldline-solutions.com/en/about/contact/index'
                }
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
                  <Label isBold={true}>
                    <p className="form-label">Test PSPID</p>
                  </Label>
                  <TextInput
                    name="merchantId"
                    value={formData[selectedOption].merchantId}
                    onChange={handleInputChange}
                  />
                  <Label isBold={true}>
                    <p className="form-label">Test API Key</p>
                  </Label>
                  <TextInput
                    name="apiKey"
                    value={formData[selectedOption].apiKey}
                    onChange={handleInputChange}
                  />
                  <Label isBold={true}>
                    <p className="form-label">Test API Secret</p>
                  </Label>
                  <TextInput
                    name="apiSecret"
                    value={formData[selectedOption].apiSecret}
                    onChange={handleInputChange}
                  />
                  <Label isBold={true}>
                    <p className="form-label">Test Webhook Key</p>
                  </Label>
                  <TextInput
                    name="webhookKey"
                    value={formData[selectedOption].webhookKey}
                    onChange={handleInputChange}
                  />
                  <Label isBold={true}>
                    <p className="form-label">Test Webhook Secret</p>
                  </Label>
                  <TextInput
                    name="webhookSecret"
                    value={formData[selectedOption].webhookSecret}
                    onChange={handleInputChange}
                  />
                  <Label isBold={true}>
                    <p className="form-label hook-url">Webhook URL</p>
                  </Label>
                  <div className="flex">
                    <TextInput
                      name="webhookUrl"
                      value={formData.webhookUrl}
                      onChange={handleInputChange}
                    />
                    <ClipboardIcon
                      style={{ margin: 'auto' }}
                      onClick={() => {
                        setCopied(true);
                        navigator.clipboard.writeText(formData.webhookUrl);
                      }}
                    />
                  </div>
                  <div
                    className="flex"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <p className="info">
                      To avoid copy/paste issues, use the `copy` icon to copy
                      the URL
                    </p>
                    {copied && <p>Copied!</p>}
                  </div>
                  <Label isBold={true}>
                    <p className="form-label hook-url">
                      Redirection Payment Page URL - Test
                    </p>
                  </Label>
                  <TextInput
                    name="redirectUrl"
                    value={formData.redirectUrl}
                    onChange={handleInputChange}
                  />
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
