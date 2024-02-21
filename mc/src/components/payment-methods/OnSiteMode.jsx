import React from 'react';
import './style.css';
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

const OnSiteMode = ({ onSiteMode, handleOnsiteMode }) => {
  return (
    <Accordion className="payment-on-site payment-section-wrapper">
      <AccordionSummary
        className="accordion-header relative"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>On Site Mode: Card Payments Only</Typography>
        <ToggleInput
          size={'big'}
          isChecked={onSiteMode.enabled.value}
          onChange={(e) => handleOnsiteMode('enabled', e.target.checked)}
        />
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <p className="sub-title">
          On site card payment without any redirection
        </p>
        <div className="section-wrapper">
          <h5 className="section-header">{onSiteMode.payButtonTitle.label}</h5>
          <div className="template-section flex">
            <TextInput
              className="section-input"
              value={onSiteMode.payButtonTitle.value}
              type={onSiteMode.payButtonTitle.type}
              onChange={(e) =>
                handleOnsiteMode('payButtonTitle', e.target.value)
              }
            />
            <div className="dropdown-container">
              <Select
                className="select-dropdown"
                value={onSiteMode.payButtonLanguage.value}
                type={onSiteMode.payButtonLanguage.type}
                onChange={(e) =>
                  handleOnsiteMode('payButtonLanguage', e.target.value)
                }
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {onSiteMode.payButtonLanguage.values &&
                  onSiteMode.payButtonLanguage.values.map((lang, index) => (
                    <MenuItem key={`payButtonlang${index}`} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {onSiteMode.templateFileName.label}
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={onSiteMode.templateFileName.value}
              type={onSiteMode.templateFileName.type}
              placeholder={onSiteMode.templateFileName.placeholder}
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
            <span>{onSiteMode.logo.label}</span>
            <Tooltip placement="top" title={onSiteMode.logo.tooltip}>
              <InfoIcon />
            </Tooltip>
          </h5>
          <div className="template-section flex">
            <PaymentModalComponent
              images={onSiteMode.logo.value}
              source="onsite"
              saveImage={(urls) => handleOnsiteMode('logo', urls)}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default OnSiteMode;
