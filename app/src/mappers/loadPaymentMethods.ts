import { CustomObjects, CustomerPaymentToken } from '../types';

export function pick<Data extends object, Keys extends keyof Data>(
  data: Data,
  keys: Keys[],
): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>;

  keys.forEach((key) => {
    result[key] = data[key];
  });

  return result;
}

export function loadPaymentMethodsMappedResponse(
  customConfig: CustomObjects,
  customerPaymentTokens: CustomerPaymentToken[] | null,
) {
  const filteredConfig = pick(customConfig, [
    'onSiteMode_payButtonTitle',
    'onSiteMode_payButtonLanguage',
    'onSiteMode_templateFileName',
    'onSiteMode_enabled',
    'redirectModeA_sendOrderData',
    'redirectModeA_templateFileName',
    'redirectModeA_refresh',
    'redirectModeA_enabled',
    'redirectModeB_sendOrderData',
    'redirectModeB_payButtonTitle',
    'redirectModeB_templateFileName',
    'redirectModeB_groupCards',
    'paymentOption',
    'authorizationPaymentOption',
    'captureConfiguration',
    'placeOrder',
    'placeOrderLanguage',
    'advancedLogging',
    'force3DSv2',
    'bgColor',
    'textColor',
    'outlineColor',
    'enabled',
    'redirectModeB_enabled',
    'onSiteMode_merchantReferenceID',
  ]);

  const tokens =
    customerPaymentTokens && Array.isArray(customerPaymentTokens)
      ? customerPaymentTokens.map((cpt) => ({
          title: cpt?.title || '',
          token: cpt?.token || '',
        }))
      : [];

  const config: { title: string; value: string | boolean }[] = [];

  Object.entries(filteredConfig).forEach(([title, value]) => {
    config.push({
      title,
      value,
    });
  });

  return {
    tokens,
    config,
  };
}
