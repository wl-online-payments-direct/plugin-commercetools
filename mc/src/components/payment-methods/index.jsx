import React, { useContext, useState, useReducer, useEffect } from 'react';
import './style.css';
import PageWrapper, { PaymentContext } from '../page-wrapper';
import PaymentCard from '../payment-card';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import ToggleInput from '@commercetools-uikit/toggle-input';
import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextInput from '@commercetools-uikit/text-input';
import worldlineLogo from '../../assets/worldline-logo-main.png';
import PrimaryButton from '@commercetools-uikit/primary-button';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@commercetools-uikit/tooltip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DownloadIcon } from '@commercetools-uikit/icons';
import {
  createCustomObject,
  getCustomObject,
} from '../../ct-methods/customObject';
import { CONTAINER_NAME, CONTAINER_KEY } from '../../../configuration';

const PaymentMethods = () => {
  const payment = useContext(PaymentContext);
  const [apiData, setAPIData] = useState({});
  const initialState = {
    onSiteMode: {
      payButtonTitle: {
        label: 'Pay Button Title',
        type: 'text',
        value: 'Pay with credit cards',
        validation: 'required',
        criteria: ['alpha'],
      },
      payButtonLanguage: {
        label: '',
        type: 'text',
        value: 'EN',
        values: {
          EN: 'Pay with credit cards',
          ES: 'Pagar con tarjetas de crédito',
          FR: 'Payer par carte de crédit',
          NL: 'Betaal met creditcards',
          DE: 'Bezahlen Sie mit Kreditkarten',
          IT: 'Paga con carte di credito',
        },
      },
      templateFileName: {
        label: ' Template File Name',
        type: 'text',
        value: 'SimplifiedCustomPaymentPage',
        placeholder: 'Enter templated file name',
        validation: 'required',
        criteria: [],
      },
      displayLogo: {
        label: 'Display Logo for Accepted Card Brands',
        type: 'file',
        validation: 'required',
        criteria: [],
        tooltip: 'Max size 5MB, max dimensions 200x80px,supported jpg,svg,png',
      },
      enabled: {
        value: false,
      },
    },
    redirectModeA: {
      sendOrderData: {
        label: 'Send Order Data',
        type: 'boolean',
        value: false,
        tooltip: 'Show Basket Data on Worldline Payment Page',
      },
      templateFileName: {
        label: ' Template File Name',
        type: 'text',
        value: 'SimplifiedCustomPaymentPage',
        placeholder: 'Enter templated file name',
        validation: 'required',
        criteria: [],
      },
      refresh: {
        label: 'Refresh list of available payment methods',
        type: 'boolean',
        value: true,
        tooltip:
          'New payment methods added to your worldline account will be added to the list below',
      },
      paymentOptions: {
        'American Express': {
          label: 'American Express',
          logo: '',
          enabled: false,
        },
        BCMC: {
          label: 'BCMC',
          logo: '',
          enabled: false,
        },
        CB: {
          label: 'CB',
          logo: '',
          enabled: false,
        },
        'Diners Club': {
          label: 'Diners Club',
          logo: '',
          enabled: false,
        },
        Eurocard: {
          label: 'Eurocard',
          logo: '',
          enabled: false,
        },
        GOOGLEPAY: {
          label: 'GOOGLEPAY',
          logo: '',
          enabled: false,
        },
        JCB: {
          label: 'JCB',
          logo: '',
          enabled: false,
        },
        Maestro: {
          label: 'Maestro',
          logo: '',
          enabled: false,
        },
        PAYPAL: {
          label: 'PAYPAL',
          logo: '',
          enabled: false,
        },
        VISA: {
          label: 'VISA',
          logo: '',
          enabled: false,
        },
        WeChatPay: {
          label: 'WeChatPay',
          logo: '',
          enabled: false,
        },
      },
      enabled: {
        value: false,
      },
    },
    redirectModeB: {
      sendOrderData: {
        label: 'Send Order Data',
        type: 'boolean',
        value: false,
        tooltip: 'Show Basket Data on Worldline Payment Page',
      },
      displayLogo: {
        label: 'Generic Logo Displayed on Your Payment Page',
        type: 'file',
        validation: 'required',
        criteria: [],
      },
      payButtonTitle: {
        label: 'Pay Button Title',
        type: 'text',
        value: 'Pay by Worldline',
        validation: 'required',
        criteria: ['alpha'],
      },
      templateFileName: {
        label: ' Template File Name',
        type: 'text',
        value: 'SimplifiedCustomPaymentPage',
        placeholder: 'Enter templated file name',
        validation: 'required',
        criteria: [],
      },
      groupCards: {
        label: 'Group Cards',
        type: 'boolean',
        value: false,
        tooltip:
          'Enabling this setting will group and co-badge card brands when relevant',
      },
      enabled: false,
    },
    paymentOption: {
      label: 'Payment Option',
      type: 'boolean',
      value: '1',
      validation: 'required',
      criteria: [],
      tooltip: 'Final execution of the payment',
    },
    authorizationPaymentOption: {
      label: 'Authorization Payment Option',
      type: 'boolean',
      value: '1',
      validation: 'required',
      criteria: [],
    },
    captureConfiguration: {
      label: 'Capture Configuration',
      type: 'text',
      value: '-1',
      values: {
        '-1': 'Manually',
        0: 'At the end of the day',
        1: 'After 1 day',
        2: 'After 2 days',
        3: 'After 3 days',
        4: 'After 4 days',
        5: 'After 5 days',
        6: 'After 6 days',
        7: 'After 7 days',
      },
      validation: 'required',
    },
    placeOrder: {
      label: 'Place Order',
      type: 'text',
      value: 'Place an Order',
      validation: 'required',
      criteria: ['alpha'],
    },
    placeOrderLanguage: {
      label: '',
      type: 'text',
      value: 'EN',
      values: {
        EN: 'Place an order',
        ES: 'Realizar Pedido',
        FR: 'Passer la commande',
        NL: 'Plaats Bestelling',
        DE: 'Bestellung aufgeben',
        IT: 'Effettua l`ordine',
      },
      validation: 'required',
    },
    advancedLogging: {
      label: 'Enable advanced logging',
      type: 'boolean',
      value: false,
      validation: 'required',
      criteria: [],
    },
    force3DSv2: {
      label: 'Force 3DSv2',
      type: 'boolean',
      value: false,
      validation: 'required',
      criteria: [],
    },
    bgColor: {
      label: 'Background Color',
      type: 'color',
      value: '#fff',
      validation: 'required',
      criteria: [],
    },
    textColor: {
      label: 'Text Color',
      type: 'color',
      value: '#fff',
      validation: 'required',
      criteria: [],
    },
    outlineColor: {
      label: 'Outline Color',
      type: 'color',
      value: '#fff',
      validation: 'required',
      criteria: [],
    },
    enabled: {
      value: false,
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ENABLE-WORLDLINE':
        return {
          ...state,
          enabled: {
            value: action.value,
          },
        };
      case 'ONSITE-MODE':
        return {
          ...state,
          onSiteMode: {
            ...action.value,
          },
        };
      case 'REDIRECT-MODE-A':
        return {
          ...state,
          redirectModeA: {
            ...action.value,
          },
        };
      case 'REDIRECT-MODE-B':
        return {
          ...state,
          redirectModeB: {
            ...action.value,
          },
        };
      case 'GENERAL-SETTINGS':
        return {
          ...action.value,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnsiteMode = (field, value) => {
    const payload = { ...state.onSiteMode };
    payload[field] = {
      ...payload[field],
      value: value,
    };

    if (field === 'payButtonLanguage') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        value: state.onSiteMode[field].values[value],
      };
    }

    dispatch({
      type: 'ONSITE-MODE',
      value: payload,
    });
  };

  const handleRedirectModeA = (field, value) => {
    const payload = { ...state.redirectModeA };
    payload[field] = {
      ...payload[field],
      value: value,
    };
    dispatch({
      type: 'REDIRECT-MODE-A',
      value: payload,
    });
  };

  const handleRedirectModeB = (field, value) => {
    const payload = { ...state.redirectModeB };
    payload[field] = {
      ...payload[field],
      value: value,
    };

    dispatch({
      type: 'REDIRECT-MODE-B',
      value: payload,
    });
    console.log('payload', payload);
  };

  const handleCommonSettings = (field, value) => {
    const payload = { ...state };
    payload[field] = {
      ...payload[field],
      value: value,
    };

    if (field === 'placeOrderLanguage') {
      payload['placeOrder'] = {
        ...payload['placeOrder'],
        value: state[field].values[value],
      };
    }

    dispatch({
      type: 'GENERAL-SETTINGS',
      value: payload,
    });
  };

  const handleOptionUpdate = (option, field, value) => {
    const payload = state.redirectModeA.paymentOptions;
    payload[option][field] = value;
    handleRedirectModeA('payOptionUpdate', payload);
  };

  const saveFormData = async () => {
    const payload = Object.keys(state).map((key) => {
      switch (key) {
        case 'onSiteMode':
        case 'redirectModeA':
        case 'redirectModeB':
          const data = state[key];
          return Object.keys(data)
            .map((key1) => {
              return { [key + '.' + key1]: data[key1].value };
            })
            .flat();
        default:
          return { [key]: state[key].value };
      }
    });

    let saveData = {};

    for (let pData of payload) {
      if (Array.isArray(pData)) {
        pData.forEach((pValue) => Object.assign(saveData, pValue));
      } else {
        Object.assign(saveData, pData);
      }
    }
    Object.keys(saveData).forEach((key) =>
      saveData[key] === undefined ? delete saveData[key] : {}
    );

    const final_payload = {
      ...apiData,
      value: {
        live: {
          ...apiData.value.live,
          ...saveData,
        },
        test: {
          ...apiData.value.test,
          ...saveData,
        },
      },
    };

    console.log('final Data', final_payload);
    setAPIData(final_payload);
    try {
      const response = await createCustomObject(final_payload);
      if (response.id) {
        console.log('Config settings saved successfully...');
      }
    } catch (error) {
      console.error('Error saving custom object:', error);
    }
  };

  useEffect(() => {
    getCustomObjectData();
  }, []);

  const getCustomObjectData = async () => {
    try {
      const response = await getCustomObject(CONTAINER_NAME, CONTAINER_KEY);
      if (response?.value) {
        setAPIData(response);
      }
    } catch (error) {
      console.error('Error fetching custom object:', error);
    }
  };

  return (
    <PageWrapper title={'Payment Methods'}>
      <div className="enable-worldline flex algin-end mb-1">
        <h3 className="section-header">Enable Worldline Checkout</h3>
        <ToggleInput
          size={'big'}
          isDisabled={false}
          value={state.enabled.value}
          isChecked={state.enabled.value}
          onChange={(e) => {
            dispatch({
              type: 'ENABLE-WORLDLINE',
              value: e.target.checked,
            });
          }}
        />
      </div>
      <div className="payment-options-wrapper mb-2">
        <div className="save-wrapper mb-2">
          <h2>
            Please select a combination of one or more checkout types to design
            your checkout experience
          </h2>
          <PrimaryButton
            label="Save Changes"
            onClick={() => saveFormData()}
            isDisabled={false}
          />
        </div>
        <Accordion className="payment-on-site payment-section-wrapper">
          <AccordionSummary
            className="accordion-header relative"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography>
              <p>On Site Mode: Card Payments Only</p>
            </Typography>
            <ToggleInput
              size={'big'}
              value={state.onSiteMode.enabled.value}
              isChecked={state.onSiteMode.enabled.value}
              onChange={(e) => handleOnsiteMode('enabled', e.target.checked)}
            />
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <p className="sub-title">
              On site card payment without any redirection
            </p>
            <div className="section-wrapper">
              <h5 className="section-header">
                {state.onSiteMode.payButtonTitle.label}
              </h5>
              <div className="template-section flex">
                <TextInput
                  className="section-input"
                  value={state.onSiteMode.payButtonTitle.value}
                  validation={state.onSiteMode.payButtonTitle.validation}
                  type={state.onSiteMode.payButtonTitle.type}
                  onChange={(e) =>
                    handleOnsiteMode('payButtonTitle', e.target.value)
                  }
                />
                <div className="dropdown-container">
                  <Select
                    className="select-dropdown"
                    value={state.onSiteMode.payButtonLanguage.value}
                    validation={state.onSiteMode.payButtonLanguage.validation}
                    type={state.onSiteMode.payButtonLanguage.type}
                    onChange={(e) =>
                      handleOnsiteMode('payButtonLanguage', e.target.value)
                    }
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {state.onSiteMode.payButtonLanguage.values &&
                      Object.keys(
                        state.onSiteMode.payButtonLanguage.values
                      ).map((lang, index) => (
                        <MenuItem key={`lang${index}`} value={lang}>
                          {lang}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">
                {state.onSiteMode.templateFileName.label}
              </h5>
              <div className="template-section">
                <TextInput
                  className="section-input"
                  value={state.onSiteMode.templateFileName.value}
                  validation={state.onSiteMode.templateFileName.validation}
                  type={state.onSiteMode.templateFileName.type}
                  placeholder={state.onSiteMode.templateFileName.placeholder}
                  onChange={(e) =>
                    handleOnsiteMode('templateFileName', e.target.value)
                  }
                />
                <p className="sub-title">
                  If you are using a customized template, please enter the name
                  here. If empty, the standard payment page will be displayed.
                  Payment page look and feel can be customized on Worldline Back
                  Office.
                </p>
              </div>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">
                {state.onSiteMode.displayLogo.label}
                <Tooltip
                  placement="top"
                  title={state.onSiteMode.displayLogo.tooltip}
                >
                  <InfoIcon />
                </Tooltip>
              </h5>
              <div className="template-section flex">
                <img className="" src={worldlineLogo} alt={worldlineLogo} />
                <input
                  className="section-input"
                  value={state.onSiteMode.displayLogo.value}
                  validation={state.onSiteMode.displayLogo.validation}
                  type={state.onSiteMode.displayLogo.type}
                  onChange={(event) => console.log(event.target.value)}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="payment-redirect payment-section-wrapper">
          <AccordionSummary
            className="accordion-header relative"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography>
              <p>
                Redirect Mode A: Payment Method selection <b>before </b>
                redirection
              </p>
            </Typography>
            <ToggleInput
              size={'big'}
              value={state.redirectModeA.value}
              isChecked={state.redirectModeA.enabled.value}
              onChange={(e) => handleRedirectModeA('enabled', e.target.checked)}
            />
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <p className="sub-title">Single payment buttons selected on site</p>
            <div className="relative">
              <span className="float-right">
                <p>
                  Send Order Data
                  <Tooltip
                    placement="top"
                    title={state.redirectModeA.sendOrderData.tooltip}
                  >
                    <InfoIcon />
                  </Tooltip>
                </p>
                <CheckboxInput
                  value={state.redirectModeA.sendOrderData.value}
                  onChange={(e) =>
                    handleRedirectModeA('sendOrderData', e.target.checked)
                  }
                  isChecked={state.redirectModeA.sendOrderData.value}
                />
              </span>
            </div>
            <SecondaryButton
              label={state.redirectModeA.refresh.label}
              onClick={() => console.log('Button clicked')}
            >
              <Tooltip
                placement="top"
                title={state.redirectModeA.refresh.tooltip}
              >
                <InfoIcon />
              </Tooltip>
            </SecondaryButton>

            <ol className="payment-options">
              {state.redirectModeA.paymentOptions &&
                Object.keys(state.redirectModeA.paymentOptions).map(
                  (option, index) => (
                    <li key={`payment-options-${index}`}>
                      <PaymentCard
                        logo={state.redirectModeA.paymentOptions[option].label}
                        active={
                          state.redirectModeA.paymentOptions[option].enabled
                        }
                        handleChange={handleOptionUpdate}
                      />
                    </li>
                  )
                )}
            </ol>
            <div className="section-wrapper">
              <h5 className="section-header">
                {state.redirectModeA.templateFileName.label}
              </h5>
              <div className="template-section">
                <TextInput
                  className="section-input"
                  value={state.redirectModeA.templateFileName.value}
                  validation={state.redirectModeA.templateFileName.validation}
                  type={state.redirectModeA.templateFileName.type}
                  onChange={(e) =>
                    handleRedirectModeA('templateFileName', e.target.value)
                  }
                  placeholder={state.redirectModeA.templateFileName.placeholder}
                />
                <p className="sub-title">
                  If you are using a customized template, please enter the name
                  here. If empty, the standard payment page will be displayed.
                  Payment page look and feel can be customized on Worldline Back
                  Office.
                </p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="payment-redirect payment-section-wrapper">
          <AccordionSummary
            className="accordion-header relative"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography>
              <p>
                Redirect Mode B: Payment Method selection <b>after </b>
                redirection
              </p>
            </Typography>
            <ToggleInput
              size={'big'}
              value={state.redirectModeB.enabled.value}
              isChecked={state.redirectModeB.enabled.value}
              onChange={(e) => handleRedirectModeB('enabled', e.target.checked)}
            />
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <p className="sub-title">
              Full redirection to Worldline Online Payments page
            </p>
            <div className="relative">
              <span className="float-right">
                <p>
                  Send Order Data
                  <Tooltip
                    placement="top"
                    title={state.redirectModeB.sendOrderData.tooltip}
                  >
                    <InfoIcon />
                  </Tooltip>
                </p>
                <CheckboxInput
                  value={state.redirectModeB.sendOrderData.value}
                  onChange={(e) =>
                    handleRedirectModeB('sendOrderData', e.target.checked)
                  }
                  isChecked={state.redirectModeB.sendOrderData.value}
                />
              </span>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">
                {state.redirectModeB.displayLogo.label}
              </h5>
              <div className="template-section flex">
                <img className="" src={worldlineLogo} alt={worldlineLogo} />
                <input
                  className="section-input"
                  value={state.redirectModeB.displayLogo.value}
                  validation={state.redirectModeB.displayLogo.validation}
                  type={state.redirectModeB.displayLogo.type}
                  onChange={(event) => console.log(event.target.value)}
                />
              </div>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">
                {state.redirectModeB.payButtonTitle.label}
              </h5>
              <div className="template-section">
                <TextInput
                  className="section-input"
                  value={state.redirectModeB.payButtonTitle.value}
                  validation={state.redirectModeB.payButtonTitle.validation}
                  type={state.redirectModeB.payButtonTitle.type}
                  onChange={(e) =>
                    handleRedirectModeB('payButtonTitle', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">
                {state.redirectModeB.templateFileName.label}
              </h5>
              <div className="template-section">
                <TextInput
                  className="section-input"
                  value={state.redirectModeB.templateFileName.value}
                  validation={state.redirectModeB.templateFileName.validation}
                  type={state.redirectModeB.templateFileName.type}
                  placeholder={state.redirectModeB.templateFileName.placeholder}
                  onChange={(e) =>
                    handleRedirectModeB('templateFileName', e.target.value)
                  }
                />
                <p className="sub-title">
                  If you are using a customized template, please enter the name
                  here. If empty, the standard payment page will be displayed.
                  Payment page look and feel can be customized on Worldline Back
                  Office.
                </p>
              </div>
            </div>

            <div className="section-wrapper flex">
              <CheckboxInput
                value={state.redirectModeB.groupCards.value}
                onChange={(e) =>
                  handleRedirectModeB('groupCards', e.target.checked)
                }
                isChecked={state.redirectModeB.groupCards.value}
              />
              <p>
                {state.redirectModeB.groupCards.label}
                <Tooltip
                  placement="top"
                  title={state.redirectModeB.groupCards.tooltip}
                >
                  <InfoIcon />
                </Tooltip>
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
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
              onChange={(e) =>
                handleCommonSettings('placeOrder', e.target.value)
              }
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
                  Object.keys(state.placeOrderLanguage.values).map(
                    (lang, index) => (
                      <MenuItem key={`lang${index}`} value={lang}>
                        {lang}
                      </MenuItem>
                    )
                  )}
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
            {state.advancedLogging.value && <DownloadIcon />}
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
                onChange={(e) =>
                  handleCommonSettings('bgColor', e.target.value)
                }
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
        <div className="save-wrapper algin-end">
          <PrimaryButton
            label="Save Changes"
            onClick={() => saveFormData()}
            isDisabled={false}
          />
        </div>
      </div>
      <p class="supportmail">
        Support Email :{' '}
        <a href="mailto:dl-dl_shoppingcarts@worldline.com">
          dl-dl_shoppingcarts@worldline.com
        </a>
      </p>
    </PageWrapper>
  );
};

PaymentMethods.displayName = 'PaymentMethods';

export default PaymentMethods;
