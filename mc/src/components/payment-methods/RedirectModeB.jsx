import React from 'react';
import './style.css';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import ToggleInput from '@commercetools-uikit/toggle-input';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextInput from '@commercetools-uikit/text-input';
import worldlineLogo from '../../assets/worldline-logo-main.png';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@commercetools-uikit/tooltip';

const RedirectModeB = ({
  redirectModeB,
  handleRedirectModeB,
  handleLogoUpload,
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
            Redirect Mode B: Payment Method selection <b>after </b>
            redirection
          </p>
        </Typography>
        <ToggleInput
          size={'big'}
          value={redirectModeB.enabled.value}
          isChecked={redirectModeB.enabled.value}
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
                title={redirectModeB.sendOrderData.tooltip}
              >
                <InfoIcon />
              </Tooltip>
            </p>
            <CheckboxInput
              value={redirectModeB.sendOrderData.value}
              onChange={(e) =>
                handleRedirectModeB('sendOrderData', e.target.checked)
              }
              isChecked={redirectModeB.sendOrderData.value}
            />
          </span>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">{redirectModeB.logo.label}</h5>
          <div className="template-section flex">
            <img className="" src={worldlineLogo} alt={worldlineLogo} />
            <input
              className="section-input"
              value={redirectModeB.logo.value}
              validation={redirectModeB.logo.validation}
              type={redirectModeB.logo.type}
              onChange={(event) => handleLogoUpload(event)}
            />
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {redirectModeB.payButtonTitle.label}
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={redirectModeB.payButtonTitle.value}
              validation={redirectModeB.payButtonTitle.validation}
              type={redirectModeB.payButtonTitle.type}
              onChange={(e) =>
                handleRedirectModeB('payButtonTitle', e.target.value)
              }
            />
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {redirectModeB.merchantReferenceID.label}
            <Tooltip
              placement="top"
              title={redirectModeB.merchantReferenceID.tooltip}
            >
              <InfoIcon />
            </Tooltip>
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={redirectModeB.merchantReferenceID.value}
              validation={redirectModeB.merchantReferenceID.validation}
              type={redirectModeB.merchantReferenceID.type}
              placeholder={redirectModeB.merchantReferenceID.placeholder}
              onChange={(e) =>
                handleRedirectModeB('merchantReferenceID', e.target.value)
              }
            />
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {redirectModeB.templateFileName.label}
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={redirectModeB.templateFileName.value}
              validation={redirectModeB.templateFileName.validation}
              type={redirectModeB.templateFileName.type}
              placeholder={redirectModeB.templateFileName.placeholder}
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
            value={redirectModeB.groupCards.value}
            onChange={(e) =>
              handleRedirectModeB('groupCards', e.target.checked)
            }
            isChecked={redirectModeB.groupCards.value}
          />
          <p>
            {redirectModeB.groupCards.label}
            <Tooltip placement="top" title={redirectModeB.groupCards.tooltip}>
              <InfoIcon />
            </Tooltip>
          </p>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default RedirectModeB;
