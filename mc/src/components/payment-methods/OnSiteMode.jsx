import React from 'react';
import './style.css';
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const OnSiteMode = ({ onSiteMode, handleOnsiteMode, handleLogoUpload }) => {
  return (
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
          value={onSiteMode.enabled.value}
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
              validation={onSiteMode.payButtonTitle.validation}
              type={onSiteMode.payButtonTitle.type}
              onChange={(e) =>
                handleOnsiteMode('payButtonTitle', e.target.value)
              }
            />
            <div className="dropdown-container">
              <Select
                className="select-dropdown"
                value={onSiteMode.payButtonLanguage.value}
                validation={onSiteMode.payButtonLanguage.validation}
                type={onSiteMode.payButtonLanguage.type}
                onChange={(e) =>
                  handleOnsiteMode('payButtonLanguage', e.target.value)
                }
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {onSiteMode.payButtonLanguage.values &&
                  onSiteMode.payButtonLanguage.values.map((lang, index) => (
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
            {onSiteMode.merchantReferenceID.label}
            <Tooltip
              placement="top"
              title={onSiteMode.merchantReferenceID.tooltip}
            >
              <InfoIcon />
            </Tooltip>
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={onSiteMode.merchantReferenceID.value}
              validation={onSiteMode.merchantReferenceID.validation}
              type={onSiteMode.merchantReferenceID.type}
              placeholder={onSiteMode.merchantReferenceID.placeholder}
              onChange={(e) =>
                handleOnsiteMode('merchantReferenceID', e.target.value)
              }
            />
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
              validation={onSiteMode.templateFileName.validation}
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
            {onSiteMode.logo.label}
            <Tooltip placement="top" title={onSiteMode.logo.tooltip}>
              <InfoIcon />
            </Tooltip>
          </h5>
          <div className="template-section flex">
            <ImageUpload
              images={[onSiteMode.logo]}
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
