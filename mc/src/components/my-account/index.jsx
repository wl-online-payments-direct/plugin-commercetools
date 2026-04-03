import React, { useState, useEffect, useContext } from 'react';
import Link from '@commercetools-uikit/link';
import { PageContentWide } from '@commercetools-frontend/application-components';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import SelectInput from '@commercetools-uikit/select-input';
import Label from '@commercetools-uikit/label';
import TextInput from '@commercetools-uikit/text-input';
import PasswordInput from '@commercetools-uikit/password-input';
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
import Tooltip from '@mui/material/Tooltip';
import PluginVersion from '../plugin-version';
import { integrator } from '../../constants';
import InfoIcon from '@mui/icons-material/Info';

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
    apiHost,
    webhookURL,
    worldlineTestEndpoint = 'payment.preprod.direct.worldline-solutions.com',
    worldlineLiveEndpoint = 'payment.direct.worldline-solutions.com',
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
                  : apiHost + webhookURL,
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
      setFormData({
        ...dataFields[selectedOption],
        webhookUrl: {
          ...dataFields[selectedOption].webhookUrl,
          value: apiHost + webhookURL,
        },
      });
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
                !customObject?.value[pData] || customObject?.value[pData].length === 0
                  ? apiHost + webhookURL
                  : customObject?.value[pData],
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
          value: value,
          hasError: false,
        },
      };
    });
  };

  const handleSubmit = async () => {
    const payload = { ...customObject };
    const formPayload = {};

    const smtpFields = [
      'serverurl',
      'serverport',
      'serverusername',
      'serverpassword',
      'servertimeout',
      'serverto',
      'serverfrom',
    ];
    const anySmtpFieldFilled = smtpFields.some(
      (field) => formData[field]?.value && formData[field].value.toString().trim().length > 0
    );

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
      } else if (smtpFields.includes(pData)) {
        let hasError = false;
        let errMsg = '';

        if (anySmtpFieldFilled) {
          const value = formData[pData].value?.toString().trim() || '';

          if (value.length === 0) {
            hasError = true;
            errMsg = formatMessage(messages.emptyErr);
          } else {
            if (pData === 'serverport') {
              const port = parseInt(value);
              if (isNaN(port) || port < 0 || port > 65535) {
                hasError = true;
                errMsg = formatMessage(messages.serverportErr);
              }
            } else if (pData === 'servertimeout') {
              const timeout = parseInt(value);
              if (isNaN(timeout) || timeout < 0) {
                hasError = true;
                errMsg = formatMessage(messages.servertimeoutErr);
              }
            } else if (pData === 'serverurl') {
              const urlPattern = /^[a-zA-Z0-9][a-zA-Z0-9-._]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
              if (!urlPattern.test(value) && !value.startsWith('smtp.')) {
                hasError = true;
                errMsg = formatMessage(messages.serverurlErr);
              }
            } else if (pData === 'serverto' || pData === 'serverfrom') {
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailPattern.test(value)) {
                hasError = true;
                errMsg = formatMessage(messages.emailErr);
              }
            }
          }
        }

        formPayload[pData] = {
          ...formData[pData],
          hasError: hasError,
          errMsg: errMsg,
        };
      } else {
        formPayload[pData] = {
          ...formData[pData],
          hasError:
            !formData[pData].disabled && !formData[pData].hideField && formData[pData].value.length === 0,
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
      const hostToUse = selectedOption === 'live'
        ? worldlineLiveEndpoint
        : worldlineTestEndpoint;

      const conPayload = {
        merchantId: formData['merchantId'].value,
        integrator: integrator,
        apiKey: formData['apiKey'].value,
        apiSecret: formData['apiSecret'].value,
        host: hostToUse,
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
            let valueToSave = formData[fData].value?.trim();
            if (fData === 'host') {
              valueToSave = selectedOption === 'live'
                ? worldlineLiveEndpoint
                : worldlineTestEndpoint;
            }

            payload.value[selectedOption] = {
              ...payload.value[selectedOption],
              [fData]: valueToSave,
            };
          }
        }
        await saveCustomObject(payload, true);
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
                          <span className="flex">
                            <p className="form-label">
                              {formatMessage(messages[key])}
                            </p>
                            {formField.required && !formField.disabled ? (
                              <p className="required">*</p>
                            ) : null}
                            {formField.tooltipKey ? (
                              <Tooltip
                                placement="right"
                                title={formatMessage(
                                  messages[formField.tooltipKey]
                                )}
                              >
                                <InfoIcon />
                              </Tooltip>
                            ) : null}
                          </span>
                        </Label>

                        <div>
                          {formField.hasError ? (
                            <div className="error-msg">
                              <Typography>{formField.errMsg}</Typography>
                            </div>
                          ) : null}
                        </div>
                        {formField.type === 'number' ? (
                          <NumberInput
                            name={key}
                            placeholder={formatMessage(
                              messages[`${key}Placeholder`]
                            )}
                            value={formField.value}
                            onChange={handleInputChange}
                            hasError={formField.hasError}
                          />
                        ) : formField.type === 'password' ? (
                          <PasswordInput
                            name={key}
                            placeholder={formatMessage(
                              messages[`${key}Placeholder`]
                            )}
                            value={formField.value}
                            isReadOnly={formField.disabled}
                            onChange={handleInputChange}
                            hasError={formField.hasError}
                          />
                        ) : key === 'webhookUrl' ? (
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
                        )}
                      </div>
                    );
                  })}
                  <span>
                    {serverFields ? (
                      <Chip
                        className="chip"
                        icon={
                          <ArrowTriangleUpIcon
                            size="medium"
                            color="neutral60"
                          />
                        }
                        label={formatMessage(messages.serverCredTitleHide)}
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
                        label={formatMessage(messages.serverCredTitleAdd)}
                        variant="outlined"
                        onClick={showServerFields}
                      />
                    )}
                    <Tooltip
                      placement="right"
                      title={formatMessage(messages.serverCredMsg)}
                    >
                      <InfoIcon />
                    </Tooltip>
                  </span>
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
