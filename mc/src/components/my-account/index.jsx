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
import {
  ClipboardIcon,
  ArrowTriangleDownIcon,
  ArrowTriangleUpIcon,
} from '@commercetools-uikit/icons';
import { PaymentContext } from '../../context/payment';
import RequestNewFeature from '../request-new-feature';
import WhatsNew from '../whats-new';
import dataFields from './dataFields.json';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';
import messages from './messages';
import Chip from '@mui/material/Chip';
import PluginVersion from '../plugin-version';

const MyAccount = (props) => {
  const { formatMessage } = useIntl();

  const { setLoader, saveCustomObject, customObject, checkConnection } =
    useContext(PaymentContext);
  const [selectedOption, setSelectedOption] = useState('test');
  const [copied, setCopied] = useState(false);
  const [serverFields, setServerFields] = useState(false);
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
          if (['webhookUrl'].includes(pData)) {
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
            [
              'serverurl',
              'serverport',
              'serverusername',
              'serverpassword',
              'servertimeout',
              'serverto',
              'serverfrom',
            ].includes(pData)
          ) {
            payload[pData] = {
              ...prevData[pData],
              value:
                customObject?.value?.serverConfig &&
                customObject?.value?.serverConfig[
                  pData.replace('server', '')
                ] !== undefined
                  ? customObject?.value?.serverConfig[
                      pData.replace('server', '')
                    ]
                  : prevData[pData].value,
            };
          } else if (['webhookUrl'].includes(pData)) {
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
              ? formatMessage(messages.emptyErr)
              : formData[pData].value.length > 256
              ? formatMessage(messages.characterExceedErr)
              : '',
        };
      } else if (pData === 'timeOut') {
        formPayload[pData] = {
          ...formData[pData],
          hasError:
            !formData[pData].disabled &&
            (isNaN(formData[pData].value) ||
              formData[pData].value < 1 ||
              formData[pData].value > 1440),
          errMsg:
            formData[pData].value < 1
              ? formatMessage(messages.timeOutBelowErr)
              : formData[pData].value > 256
              ? formatMessage(messages.timeOutAboveErr)
              : '',
        };
      } else if (
        [
          'serverurl',
          'serverport',
          'serverusername',
          'serverpassword',
          'servertimeout',
          'serverto',
          'serverfrom',
        ].includes(pData)
      ) {
        formPayload[pData] = {
          ...formData[pData],
          hasError: false,
        };
      } else {
        formPayload[pData] = {
          ...formData[pData],
          hasError:
            !formData[pData].disabled && formData[pData].value.length === 0,
          errMsg:
            formData[pData].value.length === 0
              ? formatMessage(messages.emptyErr)
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
        integrator: 'Worldline',
        apiKey: formData['apiKey'].value,
        apiSecret: formData['apiSecret'].value,
        host: formData['host'].value,
      };
      const result = await checkConnection(conPayload);
      if (result?.connection) {
        for (let fData of Object.keys(formData)) {
          if (
            [
              'serverurl',
              'serverport',
              'serverusername',
              'serverpassword',
              'servertimeout',
              'serverto',
              'serverfrom',
            ].includes(fData)
          ) {
            payload.value = {
              ...payload.value,
              serverConfig: {
                ...payload.value.serverConfig,
                [fData.replace('server', '')]: formData[fData].value?.trim(),
              },
            };
          } else if (['webhookUrl'].includes(fData)) {
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
        hideServerFields();
      } else {
        setLoader(false);
        hideServerFields();
      }
    }
  };

  const showServerFields = () => {
    setServerFields(true);
    setFormData((prevData) => {
      const payload = { ...prevData };
      for (let pData of Object.keys(prevData)) {
        if (
          [
            'serverurl',
            'serverport',
            'serverusername',
            'serverpassword',
            'servertimeout',
            'serverto',
            'serverfrom',
          ].includes(pData)
        ) {
          payload[pData] = {
            ...prevData[pData],
            hideField: false,
          };
        }
      }
      return payload;
    });
  };

  const hideServerFields = () => {
    setServerFields(false);
    setFormData((prevData) => {
      const payload = { ...prevData };
      for (let pData of Object.keys(prevData)) {
        if (
          [
            'serverurl',
            'serverport',
            'serverusername',
            'serverpassword',
            'servertimeout',
            'serverto',
            'serverfrom',
          ].includes(pData)
        ) {
          payload[pData] = {
            ...prevData[pData],
            hideField: true,
          };
        }
      }
      return payload;
    });
  };

  return (
    <>
      <PageWrapper title={'My Account'}>
        <PageContentWide columns="1/1">
          <div id="left-div">
            <div className="logo-section">
              <div className="logo-container">
                <div className="logo-wrapper">
                  <h1 className="welcome-title">
                    {formatMessage(messages.welcome)}
                  </h1>
                  <img
                    src={worldlineLogo}
                    alt="worldline-logo"
                    className="worldline-logo"
                  />
                </div>
                <p className="welcome-description">
                  {formatMessage(messages.welcomeDescription)}
                </p>
              </div>
              <div className="bottom-section">
                <div className="contact-section">
                  <div className="contact-wrapper">
                    <Label>{formatMessage(messages.testAccountCreation)}</Label>
                    <Link
                      className="external-link"
                      isExternal={true}
                      to={signUpLink}
                    >
                      {signUpLink}
                    </Link>
                  </div>
                  <div className="contact-wrapper">
                    <Label>{formatMessage(messages.documentation)}</Label>
                    <Link
                      className="external-link"
                      isExternal={true}
                      to={documentationLink}
                    >
                      {documentationLink}
                    </Link>
                  </div>
                  <div className="contact-wrapper">
                    <Label>{formatMessage(messages.contactSalesteam)}</Label>
                    <Link
                      className="external-link"
                      isExternal={true}
                      to={contactSalesLink}
                    >
                      {contactSalesLink}
                    </Link>
                  </div>
                  <div className="contact-wrapper">
                    <Label>{formatMessage(messages.contactSupportteam)}</Label>
                    <Link
                      className="external-link"
                      isExternal={true}
                      to={contactSupportLink}
                    >
                      {contactSupportLink}
                    </Link>
                  </div>
                  <WhatsNew />
                  <PluginVersion />
                </div>
                <div className="logo-bottom-container">
                  <p>{formatMessage(messages.alsoAvailable)}</p>
                  <img src={worldlineLogoBottom} />
                </div>
              </div>
              <RequestNewFeature />
            </div>
          </div>
          <div id="right-div">
            <div className="link-wrapper">
              <Link className="external-link" isExternal={true} to={signUpLink}>
                {formatMessage(messages.signUp)}
              </Link>
              <Link
                className="external-link"
                isExternal={true}
                to={contactSupportLink}
              >
                {formatMessage(messages.contactUs)}
              </Link>
            </div>
            <div className="form-wrapper">
              <h1 className="connect-title">
                {formatMessage(messages.connectWorldline)}
              </h1>
              <div className="myaccount-form">
                <Spacings.Stack scale="m">
                  <Label isBold={true}>
                    <p className="form-label">
                      {formatMessage(messages.checkoutTypes)}
                    </p>
                  </Label>
                  <SelectInput
                    name="form-field-name"
                    value={selectedOption}
                    onChange={handleChange}
                    options={[
                      {
                        value: 'test',
                        label: formatMessage(messages.testMode),
                      },
                      {
                        value: 'live',
                        label: formatMessage(messages.liveMode),
                      },
                    ]}
                  />
                  {Object.keys(formData).map((key, i) => {
                    const formField = formData[key];
                    return formField.hideField ? null : (
                      <div key={`Data-field-${i}`}>
                        <Label isBold={true}>
                          <p className="form-label">
                            {formatMessage(messages[key])}
                          </p>
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
                                  placeholder={formatMessage(
                                    messages[`${key}Placeholder`]
                                  )}
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
                                  {formatMessage(messages.clipboardMsg)}
                                </p>
                                {copied && (
                                  <p> {formatMessage(messages.copiedMsg)}</p>
                                )}
                              </div>
                            </>
                          ) : (
                            <TextInput
                              name={key}
                              placeholder={formatMessage(
                                messages[`${key}Placeholder`]
                              )}
                              value={formField.value}
                              isReadOnly={formField.disabled}
                              onChange={handleInputChange}
                              hasError={formField.hasError}
                            />
                          )
                        ) : (
                          <NumberInput
                            name={key}
                            placeholder={formatMessage(
                              messages[`${key}Placeholder`]
                            )}
                            value={formField.value}
                            onChange={handleInputChange}
                            hasError={formField.hasError}
                          />
                        )}
                      </div>
                    );
                  })}
                  {serverFields ? (
                    <Chip
                      className="chip"
                      icon={
                        <ArrowTriangleUpIcon size="medium" color="neutral60" />
                      }
                      label="Hide Server Credentials"
                      variant="outlined"
                      onClick={hideServerFields}
                    />
                  ) : (
                    <Chip
                      className="chip"
                      icon={
                        <ArrowTriangleDownIcon
                          size="medium"
                          color="neutral60"
                        />
                      }
                      label="Add/Edit Server Credentials"
                      variant="outlined"
                      onClick={showServerFields}
                    />
                  )}
                  <PrimaryButton
                    label={formatMessage(messages.saveBtn)}
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
