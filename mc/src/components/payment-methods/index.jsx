import React, { useContext, useState, useReducer } from 'react';
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
      },
    },
    redirectModeA: {},
    redirectModeB: {},
    general: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'COMPLETE':
        return state.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, complete: !todo.complete };
          } else {
            return todo;
          }
        });
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PageWrapper title={'Payment Methods'}>
      <div className="enable-worldline flex algin-end mb-1">
        <h3 className="section-header">Enable Worldline Checkout</h3>
        <ToggleInput
          size={'big'}
          isDisabled={false}
          isChecked={true}
          onChange={(event) => alert(event.target.checked)}
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
            onClick={() => alert('clicked')}
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
              isDisabled={false}
              isChecked={true}
              onChange={(event) => alert(event.target.checked)}
            />
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <p className="sub-title">
              On site card payment without any redirection
            </p>
            <div className="section-wrapper">
              <h5 className="section-header">Pay Button Title</h5>
              <div className="template-section flex">
                <TextInput
                  className="section-input"
                  value=""
                  onChange={(event) => alert(event.target.value)}
                />
                <div className="dropdown-container">
                  <Select
                    className="select-dropdown"
                    value={age}
                    onChange={(e) => alert(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0}>Zero</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">Payment Option</h5>
              <div className="options-section">
                <RadioField
                  name="payment-option"
                  value="direct"
                  onChange={(event) => alert(event.target.value)}
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
              <h5 className="section-header">Template File Name</h5>
              <div className="template-section">
                <TextInput
                  className="section-input"
                  value=""
                  placeholder="Enter templated file name"
                  onChange={(event) => alert(event.target.value)}
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
                Display Logo for Accepted Card Brands
              </h5>
              <div className="template-section flex">
                <img className="" src={worldlineLogo} alt={worldlineLogo} />
                <input
                  className="section-input"
                  value=""
                  onChange={(event) => alert(event.target.value)}
                  type="file"
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
              isDisabled={false}
              isChecked={true}
              onChange={(event) => alert(event.target.checked)}
              size={'big'}
            />
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <p className="sub-title">Single payment buttons selected on site</p>
            <div className="relative">
              <span className="float-right">
                <p>Send Order Data</p>
                <CheckboxInput
                  value={''}
                  onChange={(event) => alert(event.target.value)}
                  isChecked={true}
                />
              </span>
            </div>
            <SecondaryButton
              label="Refresh list of available payment methods"
              onClick={() => alert('Button clicked')}
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
                  onChange={(event) => alert(event.target.value)}
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
              <h5 className="section-header">Template File Name</h5>
              <div className="template-section">
                <TextInput
                  className="section-input"
                  value=""
                  placeholder="Enter templated file name"
                  onChange={(event) => alert(event.target.value)}
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
              isDisabled={false}
              isChecked={true}
              onChange={(event) => alert(event.target.checked)}
              size={'big'}
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
                  value={''}
                  onChange={(event) => alert(event.target.value)}
                  isChecked={true}
                />
              </span>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">
                Generic Logo Displayed on Your Payment Page
              </h5>
              <div className="template-section flex">
                <img className="" src={worldlineLogo} alt={worldlineLogo} />
                <input
                  className="section-input"
                  value=""
                  onChange={(event) => alert(event.target.value)}
                  type="file"
                />
              </div>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">Pay Button Title</h5>
              <div className="template-section">
                <TextInput
                  className="section-input"
                  value=""
                  onChange={(event) => alert(event.target.value)}
                />
              </div>
            </div>
            <div className="section-wrapper">
              <h5 className="section-header">Template File Name</h5>
              <div className="template-section">
                <TextInput
                  className="section-input"
                  value=""
                  placeholder="Enter templated file name"
                  onChange={(event) => alert(event.target.value)}
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
                  onChange={(event) => alert(event.target.value)}
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
              onChange={(event) => alert(event.target.value)}
            />
            <div className="dropdown-container">
              <Select
                className="select-dropdown"
                value={age}
                onChange={(e) => alert(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={0}>Zero</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
          </div>
          <div className="force-s3sv2 flex mb-2">
            <h5 className="section-header">Force 3DSv2</h5>
            <ToggleInput
              size={'small'}
              isDisabled={false}
              isChecked={true}
              onChange={(event) => alert(event.target.checked)}
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
            onClick={() => alert('clicked')}
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
