import React from 'react';
import './style.css';
import PaymentCard from '../payment-card';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import ToggleInput from '@commercetools-uikit/toggle-input';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextInput from '@commercetools-uikit/text-input';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@commercetools-uikit/tooltip';

const RedirectModeA = ({
  redirectModeA,
  handleRedirectModeA,
  handleOptionUpdate,
}) => {
  return (
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
          value={redirectModeA.enabled.value}
          isChecked={redirectModeA.enabled.value}
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
                title={redirectModeA.sendOrderData.tooltip}
              >
                <InfoIcon />
              </Tooltip>
            </p>
            <CheckboxInput
              value={redirectModeA.sendOrderData.value}
              onChange={(e) =>
                handleRedirectModeA('sendOrderData', e.target.checked)
              }
              isChecked={redirectModeA.sendOrderData.value}
            />
          </span>
        </div>
        <SecondaryButton
          label={redirectModeA.refresh.label}
          onClick={() => console.log('Button clicked')}
        >
          <Tooltip placement="top" title={redirectModeA.refresh.tooltip}>
            <InfoIcon />
          </Tooltip>
        </SecondaryButton>

        <ol className="payment-options">
          {redirectModeA.paymentOptions &&
            Object.keys(redirectModeA.paymentOptions).map((option, index) => (
              <li key={`payment-options-${index}`}>
                <PaymentCard
                  logo={redirectModeA.paymentOptions[option].label}
                  active={redirectModeA.paymentOptions[option].enabled}
                  handleChange={handleOptionUpdate}
                />
              </li>
            ))}
        </ol>
        <div className="section-wrapper">
          <h5 className="section-header">
            {redirectModeA.merchantReferenceID.label}
            <Tooltip
              placement="top"
              title={redirectModeA.merchantReferenceID.tooltip}
            >
              <InfoIcon />
            </Tooltip>
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={redirectModeA.merchantReferenceID.value}
              validation={redirectModeA.merchantReferenceID.validation}
              type={redirectModeA.merchantReferenceID.type}
              placeholder={redirectModeA.merchantReferenceID.placeholder}
              onChange={(e) =>
                handleRedirectModeA('merchantReferenceID', e.target.value)
              }
            />
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {redirectModeA.templateFileName.label}
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={redirectModeA.templateFileName.value}
              validation={redirectModeA.templateFileName.validation}
              type={redirectModeA.templateFileName.type}
              onChange={(e) =>
                handleRedirectModeA('templateFileName', e.target.value)
              }
              placeholder={redirectModeA.templateFileName.placeholder}
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
  );
};

export default RedirectModeA;
