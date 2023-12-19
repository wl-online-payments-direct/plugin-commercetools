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

const InfoComponent = (value) => {
  return (
    <Tooltip placement="left" title={value}>
      <InfoIcon />
    </Tooltip>
  );
};

const PaymentMethods = () => {
  const payment = useContext(PaymentContext);
  const [age, setAge] = useState(0);
  const initialState = {
    onSiteMode: {
      payButtonTitle: {
        label: 'Pay Button Title',
        type: 'text',
        value: 'Pay by credit card',
        validation: 'required',
        criteria: ['alpha'],
      },
      payButtonLanguage: {
        label: '',
        type: 'text',
        value: 'EN',
      },
      templateFileName: {
        label: ' Template File Name',
        type: 'text',
        value: '',
        placeholder: 'Enter templated file name',
        validation: 'required',
        criteria: [],
      },
      displayLogo: {
        label: 'Display Logo for Accepted Card Brands',
        type: 'file',
        validation: 'required',
        criteria: [],
      },
      enable: true,
    },
    redirectModeA: {
      sendOrderData: {
        label: 'Send Order Data',
        type: 'boolean',
        value: true,
      },
      templateFileName: {
        label: ' Template File Name',
        type: 'text',
        value: '',
        placeholder: 'Enter templated file name',
        validation: 'required',
        criteria: [],
      },
      enable: true,
    },
    redirectModeB: {
      sendOrderData: {
        label: 'Send Order Data',
        type: 'boolean',
        value: true,
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
        value: 'Pay by credit card',
        validation: 'required',
        criteria: ['alpha'],
      },
      templateFileName: {
        label: ' Template File Name',
        type: 'text',
        value: '',
        placeholder: 'Enter templated file name',
        validation: 'required',
        criteria: [],
      },
      enable: true,
    },
    placeOrder: {
      label: 'Place Order',
      type: 'text',
      value: '',
      validation: 'required',
      criteria: ['alpha'],
    },
    placeOrderlanguage: {
      label: '',
      type: 'text',
      value: 'EN',
    },
    enable: true,
  };

  useEffect(() => {
    console.log('New state:::::::::::', state);
  });

  const reducer = (state, action) => {
    console.log('action', action);
    switch (action.type) {
      case 'ENABLE-WORLDLINE':
        return { ...state, enable: action.value };
      case 'ENABLE-ONSITE-MODE':
        return {
          ...state,
          onSiteMode: {
            ...state.onSiteMode,
            enable: action.value,
          },
        };
      case 'ENABLE-REDIRECT-A':
        return {
          ...state,
          redirectModeA: {
            ...state.redirectModeA,
            enable: action.value,
          },
        };
      case 'ENABLE-REDIRECT-B':
        return {
          ...state,
          redirectModeB: {
            ...state.redirectModeB,
            enable: action.value,
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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnsiteModeFormUpdate = (field, value) => {
    const payload = { ...state.onSiteMode };
    payload[field] = {
      ...payload[field],
      value: value,
    };
    dispatch({
      type: 'ONSITE-MODE',
      value: payload,
    });
    console.log('payload', payload);
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
    console.log('payload', payload);
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

  return (
    <PageWrapper title={'Payment Methods'}>
      <div className="enable-worldline flex algin-end mb-1">
        <h3 className="section-header">Enable Worldline Checkout</h3>
        <ToggleInput
          size={'big'}
          isDisabled={false}
          value={state.enable}
          isChecked={state.enable}
          onChange={(event) => {
            dispatch({
              type: 'ENABLE-WORLDLINE',
              value: event.target.checked,
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
            onClick={() => console.log('clicked')}
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
              value={state.onSiteMode.enable}
              isChecked={state.onSiteMode.enable}
              onChange={(event) =>
                dispatch({
                  type: 'ENABLE-ONSITE-MODE',
                  value: event.target.checked,
                })
              }
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
                    handleOnsiteModeFormUpdate('payButtonTitle', e.target.value)
                  }
                />
                <div className="dropdown-container">
                  <Select
                    className="select-dropdown"
                    value={state.onSiteMode.payButtonLanguage.value}
                    validation={state.onSiteMode.payButtonLanguage.validation}
                    type={state.onSiteMode.payButtonLanguage.type}
                    onChange={(e) =>
                      handleOnsiteModeFormUpdate(
                        'payButtonLanguage',
                        e.target.value
                      )
                    }
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={'EN'}>EN</MenuItem>
                    <MenuItem value={'ES'}>ES</MenuItem>
                    <MenuItem value={'FR'}>FR</MenuItem>
                    <MenuItem value={'NL'}>NL</MenuItem>
                    <MenuItem value={'DE'}>DE</MenuItem>
                    <MenuItem value={'IT'}>IT</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">
                Payment Option
                {/* <InfoComponent value={'Final execution of the payment'} /> */}
              </h5>
              <div className="options-section">
                <RadioField
                  name="payment-option"
                  value="direct"
                  onChange={(event) => console.log(event.target.value)}
                  direction="inline"
                >
                  <RadioInput.Option value="direct">
                    {'Direct Sale'}
                  </RadioInput.Option>
                  <RadioInput.Option value="authorization">
                    {'Authorization only'}
                  </RadioInput.Option>
                </RadioField>
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
                    handleOnsiteModeFormUpdate(
                      'templateFileName',
                      e.target.value
                    )
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
              value={state.redirectModeA.enable}
              isChecked={state.redirectModeA.enable}
              onChange={(event) =>
                dispatch({
                  type: 'ENABLE-REDIRECT-A',
                  value: event.target.checked,
                })
              }
            />
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <p className="sub-title">Single payment buttons selected on site</p>
            <div className="relative">
              <span className="float-right">
                <p>Send Order Data</p>
                <CheckboxInput
                  value={state.redirectModeA.sendOrderData.value}
                  onChange={(event) =>
                    handleRedirectModeA(
                      'sendOrderData',
                      !state.redirectModeA.sendOrderData.value
                    )
                  }
                  isChecked={state.redirectModeA.sendOrderData.value}
                />
              </span>
            </div>
            <SecondaryButton
              label="Refresh list of available payment methods"
              onClick={() => console.log('Button clicked')}
            />

            <ol className="payment-options">
              <li>
                <PaymentCard logo={'American Express'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'BCMC'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'CB'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'Diners Club'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'Eurocard'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'GOOGLEPAY'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'JCB'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'Maestro'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'PAYPAL'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'VISA'} active={true} />
              </li>
              <li>
                <PaymentCard logo={'WeChatPay'} active={true} />
              </li>
            </ol>
            <div className="section-wrapper">
              <h5 className="section-header">Payment Option</h5>
              <div className="options-section">
                <RadioField
                  name="payment-option"
                  value="direct"
                  onChange={(event) => console.log(event.target.value)}
                  direction="inline"
                >
                  <RadioInput.Option value="direct">
                    {'Direct Sale'}
                  </RadioInput.Option>
                  <RadioInput.Option value="authorization">
                    {'Authorization only'}
                  </RadioInput.Option>
                </RadioField>
              </div>
            </div>
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
              value={state.redirectModeB.enable}
              isChecked={state.redirectModeB.enable}
              onChange={(event) =>
                dispatch({
                  type: 'ENABLE-REDIRECT-B',
                  value: event.target.checked,
                })
              }
            />
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <p className="sub-title">
              Full redirection to Worldline Online Payments page
            </p>
            <div className="relative">
              <span className="float-right">
                <p>Send Order Data</p>
                <CheckboxInput
                  value={state.redirectModeB.sendOrderData.value}
                  onChange={(event) =>
                    handleRedirectModeB(
                      'sendOrderData',
                      !state.redirectModeB.sendOrderData.value
                    )
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
              <h5 className="section-header">Pay Button Title</h5>
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
                  placeholder={state.redirectModeB.templateFileName.placeOrder}
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
            <div className="section-wrapper">
              <h5 className="section-header">Payment Option</h5>
              <div className="options-section">
                <RadioField
                  name="payment-option"
                  value="direct"
                  onChange={(event) => console.log(event.target.value)}
                  direction="inline"
                >
                  <RadioInput.Option value="direct">
                    {'Direct Sale'}
                  </RadioInput.Option>
                  <RadioInput.Option value="authorization">
                    {'Authorization only'}
                  </RadioInput.Option>
                </RadioField>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="section-wrapper">
          <h5 className="section-header">Place Order</h5>
          <div className="template-section flex">
            <TextInput
              className="section-input"
              value=""
              onChange={(event) => console.log(event.target.value)}
            />
            <div className="dropdown-container">
              <Select
                className="select-dropdown"
                value={age}
                onChange={(e) => console.log(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={'EN'}>EN</MenuItem>
                <MenuItem value={'ES'}>ES</MenuItem>
                <MenuItem value={'FR'}>FR</MenuItem>
                <MenuItem value={'NL'}>NL</MenuItem>
                <MenuItem value={'DE'}>DE</MenuItem>
                <MenuItem value={'IT'}>IT</MenuItem>
              </Select>
            </div>
          </div>
          <div className="force-s3sv2 flex mb-2">
            <h5 className="section-header">Force 3DSv2</h5>
            <ToggleInput
              size={'small'}
              isDisabled={false}
              isChecked={true}
              onChange={(event) => console.log(event.target.checked)}
            />
          </div>
          <div className="colorpicker-section">
            <div className="colorpicker-container flex mb-2">
              <input
                type="color"
                name="bg_color"
                value="#45beaa"
                title="Background Color"
              />
              <h5 className="colorpicker-title">Background Color</h5>
            </div>
            <div className="colorpicker-container flex mb-2">
              <input
                type="color"
                name="text_color"
                value="#000000"
                title="Text Color"
              />
              <h5 className="colorpicker-title">Text Color</h5>
            </div>
            <div className="colorpicker-container flex mb-2">
              <input
                type="color"
                name="outline_color"
                value="#45beaa"
                title="Outline Color"
              />
              <h5 className="colorpicker-title">Outline Color</h5>
            </div>
          </div>
        </div>
        <div className="save-wrapper algin-end">
          <PrimaryButton
            label="Save Changes"
            onClick={() => console.log('clicked')}
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
