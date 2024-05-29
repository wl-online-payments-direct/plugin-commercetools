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
import { useIntl } from 'react-intl';
import messages from './messages';

const OnSiteMode = ({ onSiteMode, handleOnsiteMode }) => {
  const { formatMessage } = useIntl();

  return (
    <Accordion className="payment-on-site payment-section-wrapper">
      <AccordionSummary
        className="accordion-header relative"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>{formatMessage(messages.onSiteTitle)}</Typography>
        <ToggleInput
          size={'big'}
          isChecked={onSiteMode.enabled.value}
          onChange={(e) => handleOnsiteMode('enabled', e.target.checked)}
        />
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <p className="sub-title">{formatMessage(messages.onSiteDescription)}</p>
        <div className="section-wrapper">
          <h5 className="section-header">
            {formatMessage(messages.onSitePayButtonTitleLabel)}
          </h5>
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
            {formatMessage(messages.onSiteTemplateFileNameLabel)}
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={onSiteMode.templateFileName.value}
              type={onSiteMode.templateFileName.type}
              placeholder={formatMessage(
                messages.onSiteTemplateFileNamePlaceholder
              )}
              onChange={(e) =>
                handleOnsiteMode('templateFileName', e.target.value)
              }
            />
            <p className="sub-title">
              {formatMessage(messages.onSiteTemplateFileNameDescription)}
            </p>
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            <span>{onSiteMode.logo.label}</span>
            <Tooltip
              placement="top"
              title={formatMessage(messages.onSiteLogoTooltip)}
            >
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
        <div className="section-wrapper">
          <h5 className="section-header">
            {formatMessage(messages.onSite3dsEnablementLabel)}
          </h5>
          <div className="3ds-enablement flex section-3ds">
            <h5 className="section-title">
              {formatMessage(messages.onSite3dsEnablementLabel)}
              <Tooltip
                placement="top"
                title={formatMessage(messages.onSite3dsEnablementTooltip)}
              >
                <InfoIcon />
              </Tooltip>
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={false}
              isChecked={onSiteMode['3dsEnablement'].value}
              onChange={(e) =>
                handleOnsiteMode('3dsEnablement', e.target.checked)
              }
            />
          </div>
        </div>
        <div className="section-wrapper flex">
          <div className="3ds-challenge flex section-3ds">
            <h5 className="section-title">
              {formatMessage(messages.onSite3dsChallengeLabel)}
              <Tooltip
                placement="top"
                title={formatMessage(messages.onSite3dsChallengeTooltip)}
              >
                <InfoIcon />
              </Tooltip>
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={onSiteMode['3dsEnablement'].value ? false : true}
              isChecked={onSiteMode['3dsChallenge'].value}
              onChange={(e) =>
                handleOnsiteMode('3dsChallenge', e.target.checked)
              }
            />
          </div>
          <div className="3ds-excemption flex section-3ds">
            <h5 className="section-title">
              {formatMessage(messages.onSite3dsExemptionLabel)}
              <Tooltip
                placement="top"
                title={formatMessage(messages.onSite3dsExemptionTooltip)}
              >
                <InfoIcon />
              </Tooltip>
            </h5>
            <ToggleInput
              size={'small'}
              isDisabled={onSiteMode['3dsEnablement'].value ? false : true}
              isChecked={onSiteMode['3dsExemption'].value}
              onChange={(e) =>
                handleOnsiteMode('3dsExemption', e.target.checked)
              }
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default OnSiteMode;
