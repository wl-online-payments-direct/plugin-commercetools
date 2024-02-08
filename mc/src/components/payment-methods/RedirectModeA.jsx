import React from 'react';
import './style.css';
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
import Tooltip from '@mui/material/Tooltip';
import PaymentOptions from './PaymentOptions';

const RedirectModeA = ({
  redirectModeA,
  handleRedirectModeA,
  handleOptionUpdate,
  fetchPaymentMethods,
}) => {
  return (
    <Accordion className="payment-redirect payment-section-wrapper">
      <AccordionSummary
        className="accordion-header relative"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>
          Redirect Mode A: Payment Method selection <b>before </b>
          redirection
        </Typography>
        <ToggleInput
          size={'big'}
          isChecked={redirectModeA.enabled.value}
          onChange={(e) => handleRedirectModeA('enabled', e.target.checked)}
        />
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <p className="sub-title">Single payment buttons selected on site</p>
        <div className="relative">
          <span className="float-right">
            <div>
              Send Order Data
              <Tooltip
                placement="top"
                title={redirectModeA.sendOrderData.tooltip}
              >
                <InfoIcon />
              </Tooltip>
            </div>
            <CheckboxInput
              onChange={(e) =>
                handleRedirectModeA('sendOrderData', e.target.checked)
              }
              isChecked={redirectModeA.sendOrderData.value}
            />
          </span>
        </div>
        <div>
          <SecondaryButton
            label={redirectModeA.refresh.label}
            onClick={() => fetchPaymentMethods()}
          ></SecondaryButton>
          <Tooltip placement="top" title={redirectModeA.refresh.tooltip}>
            <InfoIcon />
          </Tooltip>
        </div>

        <PaymentOptions
          methods={redirectModeA.paymentOptions}
          handleOptionUpdate={handleOptionUpdate}
        />
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
        <div className="section-wrapper">
          <h5 className="section-header">
            {redirectModeA['3dsEnablement'].label}
          </h5>
          <div className="3ds-enablement flex">
            <h5 className="section-title">
              {redirectModeA['3dsEnablement'].label}
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={false}
              isChecked={redirectModeA['3dsEnablement'].value}
              onChange={(e) =>
                handleRedirectModeA('3dsEnablement', e.target.checked)
              }
            />
          </div>
        </div>
        <div className="section-wrapper flex">
          <div className="3ds-challenge flex">
            <h5 className="section-title">
              {redirectModeA['3dsChallenge'].label}
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={redirectModeA['3dsEnablement'].value ? false : true}
              isChecked={redirectModeA['3dsChallenge'].value}
              onChange={(e) =>
                handleRedirectModeA('3dsChallenge', e.target.checked)
              }
            />
          </div>
          <div className="3ds-excemption flex">
            <h5 className="section-title">
              {redirectModeA['3dsExemption'].label}
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={redirectModeA['3dsEnablement'].value ? false : true}
              isChecked={redirectModeA['3dsExemption'].value}
              onChange={(e) =>
                handleRedirectModeA('3dsExemption', e.target.checked)
              }
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default RedirectModeA;
