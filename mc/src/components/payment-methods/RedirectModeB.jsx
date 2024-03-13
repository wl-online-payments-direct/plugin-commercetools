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
import { useIntl } from 'react-intl';
import messages from './messages';

const RedirectModeB = ({ redirectModeB, handleRedirectModeB }) => {
  const { formatMessage } = useIntl();

  return (
    <Accordion className="payment-redirect payment-section-wrapper">
      <AccordionSummary
        className="accordion-header relative"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>{formatMessage(messages.redirectBTitle)}</Typography>
        <ToggleInput
          size={'big'}
          isChecked={redirectModeB.enabled.value}
          onChange={(e) => handleRedirectModeB('enabled', e.target.checked)}
        />
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <p className="sub-title">
          {formatMessage(messages.redirectBDescription)}
        </p>
        <div className="relative">
          <span className="float-right">
            <div className="flex">
              <span className="header-section-title">
                {' '}
                {formatMessage(messages.redirectBSendOrderDataLabel)}
              </span>
              <Tooltip
                placement="top"
                title={formatMessage(messages.redirectBSendOrderDataTooltip)}
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
              {formatMessage(messages.redirectBLogoLabel)}
            </span>
            <Tooltip
              placement="top"
              title={formatMessage(messages.redirectBLogoTooltip)}
            >
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
            {formatMessage(messages.redirectBPayButtonTitleLabel)}
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
            {formatMessage(messages.redirectBTemplateFileNameLabel)}
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={(redirectModeB.templateFileName.value).trim()}
              type={redirectModeB.templateFileName.type}
              placeholder={formatMessage(
                messages.redirectBTemplateFileNamePlaceholder
              )}
              onChange={(e) =>
                handleRedirectModeB('templateFileName', e.target.value)
              }
            />
            <p className="sub-title">
              {formatMessage(messages.redirectBTemplateFileNameDescription)}
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
                {formatMessage(messages.redirectBGroupCardsLabel)}
              </span>
              <Tooltip
                placement="top"
                title={formatMessage(messages.redirectBGroupCardsTooltip)}
              >
                <InfoIcon />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {formatMessage(messages.redirectB3dsEnablementLabel)}
          </h5>
          <div className="3ds-enablement flex">
            <h5 className="section-title">
              {formatMessage(messages.redirectB3dsEnablementLabel)}
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
              {formatMessage(messages.redirectB3dsChallengeLabel)}
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
              {formatMessage(messages.redirectB3dsExemptionLabel)}
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
