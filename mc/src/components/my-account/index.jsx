import React, { useState } from 'react';
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

const MyAccount = (props) => {
  const [selectedOption, setSelectedOption] = useState('test');
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // Additional logic or actions based on the selected value can be added here
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
                <Label isRequiredIndicatorVisible={true} isBold={true}>
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

                <Label isRequiredIndicatorVisible={true} isBold={true}>
                  <p className="form-label">Test PSPID</p>
                </Label>
                <TextInput
                  value="TryzensIndiaPvtLtd"
                  onChange={(event) => alert(event.target.value)}
                />
                <Label isRequiredIndicatorVisible={true} isBold={true}>
                  <p className="form-label">Test API Key</p>
                </Label>
                <TextInput
                  value="0E916***************"
                  onChange={(event) => alert(event.target.value)}
                />
                <Label isRequiredIndicatorVisible={true} isBold={true}>
                  <p className="form-label">Test API Secret</p>
                </Label>
                <TextInput
                  value="CAB82***************"
                  onChange={(event) => alert(event.target.value)}
                />
                <Label isRequiredIndicatorVisible={true} isBold={true}>
                  <p className="form-label">Test Webhook Key</p>
                </Label>
                <TextInput
                  value="73474***************"
                  onChange={(event) => alert(event.target.value)}
                />
                <Label isRequiredIndicatorVisible={true} isBold={true}>
                  <p className="form-label">Test Webhook Secret</p>
                </Label>
                <TextInput
                  value="7816A***************"
                  onChange={(event) => alert(event.target.value)}
                />
                <Label isRequiredIndicatorVisible={true} isBold={true}>
                  <p className="form-label hook-url">Webhook URL</p>
                </Label>
                <TextInput value="https://worldline.247commerce.co.uk/webhookPaymentCreate" />
                <p className="info">
                  To avoid copy/paste issues, use the `copy` icon to copy the
                  URL
                </p>
                <Label isRequiredIndicatorVisible={true} isBold={true}>
                  <p className="form-label hook-url">
                    Redirection Payment Page URL - Test
                  </p>
                </Label>
                <TextInput value="https://payment.preprod.direct.worldline-solutions.com" />
                <PrimaryButton
                  label="Save/Update"
                  onClick={() => alert('Button clicked')}
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
