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
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PaymentModalComponent from '../payment-modal';

const RedirectModeB = ({ redirectModeB, handleRedirectModeB }) => {
  return (
    <Accordion className="payment-redirect payment-section-wrapper">
      <AccordionSummary
        className="accordion-header relative"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>
          Redirect Mode B: Payment Method selection <b>after </b>
          redirection
        </Typography>
        <ToggleInput
          size={'big'}
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
            <div className="flex">
              <span className="header-section-title">Send Order Data</span>
              <Tooltip
                placement="top"
                title={redirectModeB.sendOrderData.tooltip}
              >
                <InfoIcon />
              </Tooltip>
            </div>
            <CheckboxInput
              onChange={(e) =>
                handleRedirectModeB('sendOrderData', e.target.checked)
              }
              isChecked={redirectModeB.sendOrderData.value}
            />
          </span>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            <span className="header-section-title">
              {redirectModeB.logo.label}
            </span>
            <Tooltip placement="top" title={redirectModeB.logo.tooltip}>
              <InfoIcon />
            </Tooltip>
          </h5>
          <div className="template-section flex">
            <PaymentModalComponent
              images={redirectModeB.logo.value}
              source="redirectModeB"
              saveImage={(url) => handleRedirectModeB('logo', url)}
            />
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {redirectModeB.payButtonTitle.label}
          </h5>
          <div className="template-section flex">
            <TextInput
              className="section-input"
              value={redirectModeB.payButtonTitle.value}
              type={redirectModeB.payButtonTitle.type}
              onChange={(e) =>
                handleRedirectModeB('payButtonTitle', e.target.value)
              }
            />
            <div className="dropdown-container">
              <Select
                className="select-dropdown"
                value={redirectModeB.payButtonLanguage.value}
                type={redirectModeB.payButtonLanguage.type}
                onChange={(e) =>
                  handleRedirectModeB('payButtonLanguage', e.target.value)
                }
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {redirectModeB.payButtonLanguage.values &&
                  redirectModeB.payButtonLanguage.values.map((lang, index) => (
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
            {redirectModeB.templateFileName.label}
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={(redirectModeB.templateFileName.value).trim()}
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
            onChange={(e) =>
              handleRedirectModeB('groupCards', e.target.checked)
            }
            isChecked={redirectModeB.groupCards.value}
          />
          <div className="group-cards-title">
            <div className="flex">
              <span className="header-section-title">
                {redirectModeB.groupCards.label}
              </span>
              <Tooltip placement="top" title={redirectModeB.groupCards.tooltip}>
                <InfoIcon />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {redirectModeB['3dsEnablement'].label}
          </h5>
          <div className="3ds-enablement flex">
            <h5 className="section-title">
              {redirectModeB['3dsEnablement'].label}
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={false}
              isChecked={redirectModeB['3dsEnablement'].value}
              onChange={(e) =>
                handleRedirectModeB('3dsEnablement', e.target.checked)
              }
            />
          </div>
        </div>
        <div className="section-wrapper flex">
          <div className="3ds-challenge flex">
            <h5 className="section-title">
              {redirectModeB['3dsChallenge'].label}
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={redirectModeB['3dsEnablement'].value ? false : true}
              isChecked={redirectModeB['3dsChallenge'].value}
              onChange={(e) =>
                handleRedirectModeB('3dsChallenge', e.target.checked)
              }
            />
          </div>
          <div className="3ds-excemption flex">
            <h5 className="section-title">
              {redirectModeB['3dsExemption'].label}
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={redirectModeB['3dsEnablement'].value ? false : true}
              isChecked={redirectModeB['3dsExemption'].value}
              onChange={(e) =>
                handleRedirectModeB('3dsExemption', e.target.checked)
              }
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default RedirectModeB;
