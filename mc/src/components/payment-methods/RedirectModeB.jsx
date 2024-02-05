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
import Tooltip from '@commercetools-uikit/tooltip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ImageUpload from '../image-upload';

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
            <div>
              Send Order Data
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
          <h5 className="section-header">{redirectModeB.logo.label}</h5>
          <div className="template-section flex">
            <ImageUpload
              {...redirectModeB.logo}
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
          <div>
            {redirectModeB.groupCards.label}
            <Tooltip placement="top" title={redirectModeB.groupCards.tooltip}>
              <InfoIcon />
            </Tooltip>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default RedirectModeB;
