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
import { useIntl } from 'react-intl';
import messages from './messages';

const RedirectModeA = ({
  redirectModeA,
  handleRedirectModeA,
  handleOptionUpdate,
  fetchPaymentMethods,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Accordion className="payment-redirect payment-section-wrapper">
      <AccordionSummary
        className="accordion-header relative"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>{formatMessage(messages.redirectATitle)}</Typography>
        <ToggleInput
          size={'big'}
          isChecked={redirectModeA.enabled.value}
          onChange={(e) => handleRedirectModeA('enabled', e.target.checked)}
        />
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <p className="sub-title">
          {formatMessage(messages.redirectADescription)}
        </p>
        <div className="relative">
          <span className="float-right">
            <div className="flex">
              <span className="header-section-title">
                {formatMessage(messages.redirectASendOrderDataLabel)}
              </span>
              <Tooltip
                placement="top"
                title={formatMessage(messages.redirectASendOrderDataTooltip)}
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
            label={formatMessage(messages.redirectARefreshLabel)}
            onClick={() => fetchPaymentMethods()}
          ></SecondaryButton>
          <span className="refresh-btn">
            <span>
              <Tooltip
                placement="top"
                title={formatMessage(messages.redirectARefreshTooltip)}
              >
                <InfoIcon />
              </Tooltip>
            </span>
          </span>
        </div>

        <PaymentOptions
          methods={redirectModeA.paymentOptions}
          handleOptionUpdate={handleOptionUpdate}
        />
        <div className="section-wrapper">
          <h5 className="section-header">
            {formatMessage(messages.redirectATemplateFileNameLabel)}
          </h5>
          <div className="template-section">
            <TextInput
              className="section-input"
              value={redirectModeA.templateFileName.value}
              type={redirectModeA.templateFileName.type}
              onChange={(e) =>
                handleRedirectModeA('templateFileName', e.target.value)
              }
              placeholder={formatMessage(
                messages.redirectATemplateFileNamePlaceholder
              )}
            />
            <p className="sub-title">
              {formatMessage(messages.redirectATemplateFileNameDescription)}
            </p>
          </div>
        </div>
        <div className="section-wrapper">
          <h5 className="section-header">
            {formatMessage(messages.redirectA3dsEnablementLabel)}
          </h5>
          <div className="3ds-enablement flex">
            <h5 className="section-title">
              {formatMessage(messages.redirectA3dsEnablementLabel)}
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
              {formatMessage(messages.redirectA3dsChallengeLabel)}
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
              {formatMessage(messages.redirectA3dsExemptionLabel)}
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
