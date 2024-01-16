import React, { useState, useEffect } from 'react';
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
import {
  createCustomObject,
  getCustomObject,
} from '../../ct-methods/customObject';
import { ClipboardIcon } from '@commercetools-uikit/icons';

const MyAccount = (props) => {
  const [selectedOption, setSelectedOption] = useState('test');
  const [formData, setFormData] = useState({
    live: {
      merchantId: '',
      apiKey: '',
      apiSecret: '',
      webHookKey: '',
      webHookSecret: '',
    },
    test: {
      merchantId: '',
      apiKey: '',
      apiSecret: '',
      webHookKey: '',
      webHookSecret: '',
    },
    webHookURL: '',
    paymentPageURL: '',
  });

  const getCustomObjectData = async () => {
    try {
      const response = await getCustomObject();
      setData(response.value);
      if (response?.value) {
        for (const option of ['live', 'test']) {
          const optionData = response.value[option];
          const updatedFormData = { ...formData };
          for (const key in optionData) {
            updatedFormData[option][key] = optionData[key];
          }
          setFormData(updatedFormData);
        }
      }
    } catch (error) {
      console.error('Error fetching custom object:', error);
    }
  };

  useEffect(() => {
    getCustomObjectData();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      if (name === 'webHookURL' || 'paymentPageURL') {
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
    const draft = {
      container: 'storeId',
      key: 'storeId',
      value: {
        ...data,
        webHookURL: formData.webHookURL,
        paymentPageURL: formData.paymentPageURL,
        ...(selectedOption === 'live'
          ? {
              live: {
                merchantId: formData[selectedOption].merchantId,
                apiKey: formData[selectedOption].apiKey,
                apiSecret: formData[selectedOption].apiSecret,
                webHookKey: formData[selectedOption].webHookKey,
                webHookSecret: formData[selectedOption].webHookSecret,
              },
            }
          : {
              live: {
                merchantId: formData['live'].merchantId,
                apiKey: formData['live'].apiKey,
                apiSecret: formData['live'].apiSecret,
                webHookKey: formData['live'].webHookKey,
                webHookSecret: formData['live'].webHookSecret,
              },
            }),
        ...(selectedOption === 'test'
          ? {
              test: {
                merchantId: formData[selectedOption].merchantId,
                apiKey: formData[selectedOption].apiKey,
                apiSecret: formData[selectedOption].apiSecret,
                webHookKey: formData[selectedOption].webHookKey,
                webHookSecret: formData[selectedOption].webHookSecret,
              },
            }
          : {
              test: {
                merchantId: formData['test'].merchantId,
                apiKey: formData['test'].apiKey,
                apiSecret: formData['test'].apiSecret,
                webHookKey: formData['test'].webHookKey,
                webHookSecret: formData['test'].webHookSecret,
              },
            }),
      },
    };
    try {
      const response = await createCustomObject(draft);
      if (response.id) {
        console.log('Config settings saved successfully...');
      }
    } catch (error) {
      console.error('Error saving custom object:', error);
    }
  };

  return (
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
                  name="webHookKey"
                  value={formData[selectedOption].webHookKey}
                  onChange={handleInputChange}
                />
                <Label isBold={true}>
                  <p className="form-label">Test Webhook Secret</p>
                </Label>
                <TextInput
                  name="webHookSecret"
                  value={formData[selectedOption].webHookSecret}
                  onChange={handleInputChange}
                />
                <Label isBold={true}>
                  <p className="form-label hook-url">Webhook URL</p>
                </Label>
                <div className="flex">
                  <TextInput
                    name="webHookURL"
                    value={formData.webHookURL}
                    onChange={handleInputChange}
                  />
                  <ClipboardIcon
                    style={{ margin: 'auto' }}
                    onClick={() => {
                      setCopied(true);
                      navigator.clipboard.writeText(formData.webHookURL);
                    }}
                  />
                </div>
                <div
                  className="flex"
                  style={{ justifyContent: 'space-between' }}
                >
                  <p className="info">
                    To avoid copy/paste issues, use the `copy` icon to copy the
                    URL
                  </p>
                  {copied && <p>Copied!</p>}
                </div>
                <Label isBold={true}>
                  <p className="form-label hook-url">
                    Redirection Payment Page URL - Test
                  </p>
                </Label>
                <TextInput
                  name="paymentPageURL"
                  value={formData.paymentPageURL}
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
  );
};
MyAccount.displayName = 'MyAccount';

export default MyAccount;