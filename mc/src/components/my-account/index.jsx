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
import { CONTAINER_NAME, CONTAINER_KEY } from '../../../configuration';
import { ClipboardIcon } from '@commercetools-uikit/icons';

const MyAccount = (props) => {
  const [selectedOption, setSelectedOption] = useState('test');
  const [data, setData] = useState({});
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    live: {
      merchantId: '',
      apiKey: '',
      apiSecret: '',
      webHookKey: '',
      webHookSecret: '',
      webHookURL: '',
      paymentPageURL: '',
    },
    test: {
      merchantId: '',
      apiKey: '',
      apiSecret: '',
      webHookKey: '',
      webHookSecret: '',
      webHookURL: '',
      paymentPageURL: '',
    },
  });

  useEffect(() => {
    getCustomObjectData();
  }, []);

  const getCustomObjectData = async () => {
    try {
      const response = await getCustomObject(CONTAINER_NAME, CONTAINER_KEY);
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

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [selectedOption]: {
        ...prevData[selectedOption],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const draft = {
      container: 'storeId',
      key: 'storeId',
      value: {
        ...data,
        ...(selectedOption === 'live'
          ? {
              live: {
                merchantId: formData[selectedOption].merchantId,
                apiKey: formData[selectedOption].apiKey,
                apiSecret: formData[selectedOption].apiSecret,
                webHookKey: formData[selectedOption].webHookKey,
                webHookSecret: formData[selectedOption].webHookSecret,
                webHookURL: formData[selectedOption].webHookURL,
                paymentPageURL: formData[selectedOption].paymentPageURL,
              },
            }
          : {
              live: {
                merchantId: formData['live'].merchantId,
                apiKey: formData['live'].apiKey,
                apiSecret: formData['live'].apiSecret,
                webHookKey: formData['live'].webHookKey,
                webHookSecret: formData['live'].webHookSecret,
                webHookURL: formData['live'].webHookURL,
                paymentPageURL: formData['live'].paymentPageURL,
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
                webHookURL: formData[selectedOption].webHookURL,
                paymentPageURL: formData[selectedOption].paymentPageURL,
              },
            }
          : {
              test: {
                merchantId: formData['test'].merchantId,
                apiKey: formData['test'].apiKey,
                apiSecret: formData['test'].apiSecret,
                webHookKey: formData['test'].webHookKey,
                webHookSecret: formData['test'].webHookSecret,
                webHookURL: formData['test'].webHookURL,
                paymentPageURL: formData['test'].paymentPageURL,
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
                  placeholder="Enter your PSPID"
                />
                <Label isBold={true}>
                  <p className="form-label">Test API Key</p>
                </Label>
                <TextInput
                  name="apiKey"
                  value={formData[selectedOption].apiKey}
                  onChange={handleInputChange}
                  placeholder="Enter your API Key"
                />
                <Label isBold={true}>
                  <p className="form-label">Test API Secret</p>
                </Label>
                <TextInput
                  name="apiSecret"
                  value={formData[selectedOption].apiSecret}
                  onChange={handleInputChange}
                  placeholder="Enter your API Secret"
                />
                <Label isBold={true}>
                  <p className="form-label">Test Webhook Key</p>
                </Label>
                <TextInput
                  name="webHookKey"
                  value={formData[selectedOption].webHookKey}
                  onChange={handleInputChange}
                  placeholder="Enter your Webhook Key"
                />
                <Label isBold={true}>
                  <p className="form-label">Test Webhook Secret</p>
                </Label>
                <TextInput
                  name="webHookSecret"
                  value={formData[selectedOption].webHookSecret}
                  onChange={handleInputChange}
                  placeholder="Enter your Webhook Secret"
                />
                <Label isBold={true}>
                  <p className="form-label hook-url">Webhook URL</p>
                </Label>
                <div className="flex">
                  <TextInput
                    name="webHookURL"
                    value={formData[selectedOption].webHookURL}
                    onChange={handleInputChange}
                    placeholder="Enter your Webhook URL"
                  />
                  <ClipboardIcon
                    style={{ margin: 'auto' }}
                    onClick={() => {
                      setCopied(true);
                      navigator.clipboard.writeText(
                        formData[selectedOption].webHookURL
                      );
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
                  value={formData[selectedOption].paymentPageURL}
                  onChange={handleInputChange}
                  placeholder="Enter your Redirection Payment Page URL"
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
