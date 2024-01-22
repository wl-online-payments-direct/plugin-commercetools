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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const MyAccount = (props) => {
  const [selectedOption, setSelectedOption] = useState('test');
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState(false);
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
    webHookURL: '',
    paymentPageURL: '',
  });
  const [loading, setLoading] = useState(true);
  const [toaster, setToaster] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    transition: Slide,
    severity: '',
  });
  const { vertical, horizontal, open, transition } = toaster;

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
        setLoading(false);
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
      if (name === 'webHookURL' || name === 'paymentPageURL') {
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
    setLoading(true);
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
                webhookKey: formData[selectedOption].webhookKey,
                webhookSecret: formData[selectedOption].webhookSecret,
              },
            }
          : {
              live: {
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
                merchantId: formData[selectedOption].merchantId,
                apiKey: formData[selectedOption].apiKey,
                apiSecret: formData[selectedOption].apiSecret,
                webhookKey: formData[selectedOption].webhookKey,
                webhookSecret: formData[selectedOption].webhookSecret,
              },
            }
          : {
              test: {
                merchantId: formData['test'].merchantId,
                apiKey: formData['test'].apiKey,
                apiSecret: formData['test'].apiSecret,
                webhookKey: formData['test'].webhookKey,
                webhookSecret: formData['test'].webhookSecret,
              },
            }),
      },
    };
    try {
      const response = await createCustomObject(draft);
      if (response.id) {
        setLoading(false);
        setToaster({ ...toaster, severity: 'success', open: true });
      }
    } catch (error) {
      console.error('Error saving custom object:', error);
      setToaster({ ...toaster, severity: 'error', open: true });
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
      <Snackbar
        className="snack-bar"
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
        autoHideDuration={6000}
        TransitionComponent={transition}
      >
        <Alert
          onClose={() => {
            setToaster({ ...toaster, open: false });
          }}
          severity={toaster.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toaster.severity === 'success'
            ? 'Account settings saved successfully'
            : 'Failed to save data'}
        </Alert>
      </Snackbar>
    </>
  );
};
MyAccount.displayName = 'MyAccount';

export default MyAccount;
