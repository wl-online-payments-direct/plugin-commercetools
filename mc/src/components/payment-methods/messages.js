import { defineMessages } from 'react-intl';
import initialState from './intialState.json';

export default defineMessages({
  generalWorldlineEnable: {
    id: 'general.worldlineEnable',
    defaultMessage: 'Enable Worldline Checkout',
  },
  generalTitle: {
    id: 'general.title',
    defaultMessage:
      'Please select a combination of one or more checkout types to design your checkout experience',
  },
  generalSaveBtn: {
    id: 'general.saveBtn',
    defaultMessage: 'Save Changes',
  },
  generalSupportMail: {
    id: 'general.supportMail',
    defaultMessage: 'Support Email : ',
  },
  generalMerchantReferenceLabel: {
    id: 'general.merchantReference.label',
    defaultMessage: initialState.merchantReference.label,
  },
  generalMerchantReferenceTooltip: {
    id: 'general.merchantReference.tooltip',
    defaultMessage: initialState.merchantReference.tooltip,
  },
  generalMerchantReferencePlaceholder: {
    id: 'general.merchantReference.placeholder',
    defaultMessage: initialState.merchantReference.placeholder,
  },
  generalMerchantReferenceErrMsg: {
    id: 'general.merchantReference.errMsg',
    defaultMessage: 'Maximum 12 characters.',
  },
  generalPaymentOptionLabel: {
    id: 'general.paymentOption.label',
    defaultMessage: initialState.paymentOption.label,
  },
  generalPaymentOptionTooltip: {
    id: 'general.paymentOption.tooltip',
    defaultMessage: initialState.paymentOption.tooltip,
  },
  generalPaymentOptionsDirect: {
    id: 'general.paymentOptions.direct',
    defaultMessage: 'Direct Sale',
  },
  generalPaymentOptionsAuth: {
    id: 'general.paymentOptions.auth',
    defaultMessage: 'Authorization only',
  },
  generalPaymentOptionsPre: {
    id: 'general.paymentOptions.pre',
    defaultMessage: 'Preauthorization',
  },
  generalPaymentOptionsPreTooltip: {
    id: 'general.paymentOption.pre.tooltip',
    defaultMessage:
      'Use a preauthorization to block the funds of your customers for a period of 30 days. The amount captured can be lower than the authorized amount. Note that all acquirers and activity sectors do not support preauthorizations.',
  },
  generalPaymentOptionsFinal: {
    id: 'general.paymentOptions.final',
    defaultMessage: 'Authorization',
  },
  generalPaymentOptionsFinalTooltip: {
    id: 'general.paymentOption.final.tooltip',
    defaultMessage:
      "Use authorization to block the funds of your customers for a period of 7 days. Those can't be reversed and need to be captured for the full amount.",
  },
  generalCaptureAuthorizationModeLabel: {
    id: 'general.captureAuthorizationMode.label',
    defaultMessage: initialState.captureAuthorizationMode.label,
  },
  generalCaptureAuthorizationModeTooltip: {
    id: 'general.captureAuthorizationMode.tooltip',
    defaultMessage: initialState.captureAuthorizationMode.tooltip,
  },
  generalenableLogsLabel: {
    id: 'general.enableLogs.label',
    defaultMessage: initialState.enableLogs.label,
  },
  onSiteTitle: {
    id: 'onSite.title',
    defaultMessage: 'On Site Mode: Card Payments Only',
  },
  onSiteDescription: {
    id: 'onSite.description',
    defaultMessage: 'On site card payment without any redirection',
  },
  onSitePayButtonTitleLabel: {
    id: 'onSite.payButtonTitle.label',
    defaultMessage: initialState.onSiteMode.payButtonTitle.label,
  },
  onSiteTemplateFileNameLabel: {
    id: 'onSite.templateFileName.label',
    defaultMessage: initialState.onSiteMode.templateFileName.label,
  },
  onSiteTemplateFileNamePlaceholder: {
    id: 'onSite.templateFileName.placeholder',
    defaultMessage: initialState.onSiteMode.templateFileName.placeholder,
  },
  onSiteTemplateFileNameDescription: {
    id: 'onSite.templateFileName.description',
    defaultMessage: `If you are using a customized template, please enter the name
    here. If empty, the standard payment page will be displayed.
    Payment page look and feel can be customized on Worldline Back
    Office.`,
  },
  onSiteLogoLabel: {
    id: 'onSite.logo.label',
    defaultMessage: initialState.onSiteMode.logo.label,
  },
  onSiteLogoTooltip: {
    id: 'onSite.logo.tooltip',
    defaultMessage: initialState.onSiteMode.logo.tooltip,
  },
  onSite3dsEnablementLabel: {
    id: 'onSite.3dsEnablement.label',
    defaultMessage: initialState.onSiteMode['3dsEnablement'].label,
  },
  onSite3dsEnablementTooltip: {
    id: 'onSite.3dsEnablement.tooltip',
    defaultMessage: initialState.onSiteMode['3dsEnablement'].tooltip,
  },
  onSite3dsChallengeLabel: {
    id: 'onSite.3dsChallenge.label',
    defaultMessage: initialState.onSiteMode['3dsChallenge'].label,
  },
  onSite3dsChallengeTooltip: {
    id: 'onSite.3dsChallenge.tooltip',
    defaultMessage: initialState.onSiteMode['3dsChallenge'].tooltip,
  },
  onSite3dsExemptionLabel: {
    id: 'onSite.3dsExemption.label',
    defaultMessage: initialState.onSiteMode['3dsExemption'].label,
  },
  onSite3dsExemptionTooltip: {
    id: 'onSite.3dsExemption.tooltip',
    defaultMessage: initialState.onSiteMode['3dsExemption'].tooltip,
  },
  redirectATitle: {
    id: 'redirectA.title',
    defaultMessage:
      'Redirect Mode A: Payment Method selection before redirection',
  },
  redirectADescription: {
    id: 'redirectA.description',
    defaultMessage: 'Single payment buttons selected on site',
  },
  redirectASendOrderDataLabel: {
    id: 'redirectA.sendOrderData.label',
    defaultMessage: initialState.redirectModeA.sendOrderData.label,
  },
  redirectASendOrderDataTooltip: {
    id: 'redirectA.sendOrderData.tooltip',
    defaultMessage: initialState.redirectModeA.sendOrderData.tooltip,
  },
  redirectARefreshLabel: {
    id: 'redirectA.refresh.label',
    defaultMessage: initialState.redirectModeA.refresh.label,
  },
  redirectARefreshTooltip: {
    id: 'redirectA.refresh.tooltip',
    defaultMessage: initialState.redirectModeA.refresh.tooltip,
  },
  redirectATemplateFileNameLabel: {
    id: 'redirectA.templateFileName.label',
    defaultMessage: initialState.redirectModeA.templateFileName.label,
  },
  redirectATemplateFileNamePlaceholder: {
    id: 'redirectA.templateFileName.placeholder',
    defaultMessage: initialState.redirectModeA.templateFileName.placeholder,
  },
  redirectATemplateFileNameDescription: {
    id: 'redirectA.templateFileName.description',
    defaultMessage: `If you are using a customized template, please enter the name
    here. If empty, the standard payment page will be displayed.
    Payment page look and feel can be customized on Worldline Back
    Office.`,
  },
  redirectA3dsEnablementLabel: {
    id: 'redirectA.3dsEnablement.label',
    defaultMessage: initialState.redirectModeA['3dsEnablement'].label,
  },
  redirectA3dsEnablementTooltip: {
    id: 'redirectA.3dsEnablement.tooltip',
    defaultMessage: initialState.redirectModeA['3dsEnablement'].tooltip,
  },
  redirectA3dsChallengeLabel: {
    id: 'redirectA.3dsChallenge.label',
    defaultMessage: initialState.redirectModeA['3dsChallenge'].label,
  },
  redirectA3dsChallengeTooltip: {
    id: 'redirectA.3dsChallenge.tooltip',
    defaultMessage: initialState.redirectModeA['3dsChallenge'].tooltip,
  },
  redirectA3dsExemptionLabel: {
    id: 'redirectA.3dsExemption.label',
    defaultMessage: initialState.redirectModeA['3dsExemption'].label,
  },
  redirectA3dsExemptionTooltip: {
    id: 'redirectA.3dsExemption.tooltip',
    defaultMessage: initialState.redirectModeA['3dsExemption'].tooltip,
  },
  redirectBTitle: {
    id: 'redirectB.title',
    defaultMessage:
      'Redirect Mode B: Payment Method selection after redirection',
  },
  redirectBDescription: {
    id: 'redirectB.description',
    defaultMessage: 'Full redirection to Worldline Online Payments page',
  },
  redirectBSendOrderDataLabel: {
    id: 'redirectB.sendOrderData.label',
    defaultMessage: initialState.redirectModeB.sendOrderData.label,
  },
  redirectBSendOrderDataTooltip: {
    id: 'redirectB.sendOrderData.tooltip',
    defaultMessage: initialState.redirectModeB.sendOrderData.tooltip,
  },
  redirectBLogoLabel: {
    id: 'redirectB.logo.label',
    defaultMessage: initialState.redirectModeB.logo.label,
  },
  redirectBLogoTooltip: {
    id: 'redirectB.logo.tooltip',
    defaultMessage: initialState.redirectModeB.logo.tooltip,
  },
  redirectBPayButtonTitleLabel: {
    id: 'redirectB.payButtonTitle.label',
    defaultMessage: initialState.redirectModeB.payButtonTitle.label,
  },
  redirectBTemplateFileNameLabel: {
    id: 'redirectB.templateFileName.label',
    defaultMessage: initialState.redirectModeB.templateFileName.label,
  },
  redirectBTemplateFileNamePlaceholder: {
    id: 'redirectB.templateFileName.placeholder',
    defaultMessage: initialState.redirectModeB.templateFileName.placeholder,
  },
  redirectBTemplateFileNameDescription: {
    id: 'redirectB.templateFileName.description',
    defaultMessage: `If you are using a customized template, please enter the name
    here. If empty, the standard payment page will be displayed.
    Payment page look and feel can be customized on Worldline Back
    Office.`,
  },
  redirectBGroupCardsLabel: {
    id: 'redirectB.groupCards.label',
    defaultMessage: initialState.redirectModeB.groupCards.label,
  },
  redirectBGroupCardsTooltip: {
    id: 'redirectB.groupCards.tooltip',
    defaultMessage: initialState.redirectModeB.groupCards.tooltip,
  },
  redirectB3dsEnablementLabel: {
    id: 'redirectB.3dsEnablement.label',
    defaultMessage: initialState.redirectModeB['3dsEnablement'].label,
  },
  redirectB3dsEnablementTooltip: {
    id: 'redirectB.3dsEnablement.tooltip',
    defaultMessage: initialState.redirectModeB['3dsEnablement'].tooltip,
  },
  redirectB3dsChallengeLabel: {
    id: 'redirectB.3dsChallenge.label',
    defaultMessage: initialState.redirectModeB['3dsChallenge'].label,
  },
  redirectB3dsChallengeTooltip: {
    id: 'redirectB.3dsChallenge.tooltip',
    defaultMessage: initialState.redirectModeB['3dsChallenge'].tooltip,
  },
  redirectB3dsExemptionLabel: {
    id: 'redirectB.3dsExemption.label',
    defaultMessage: initialState.redirectModeB['3dsExemption'].label,
  },
  redirectB3dsExemptionTooltip: {
    id: 'redirectB.3dsExemption.tooltip',
    defaultMessage: initialState.redirectModeB['3dsExemption'].tooltip,
  },
});
