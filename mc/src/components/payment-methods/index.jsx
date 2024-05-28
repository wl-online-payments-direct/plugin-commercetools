import React, { useContext, useReducer, useEffect } from 'react';
import './style.css';
import PageWrapper from '../page-wrapper';
import PrimaryButton from '@commercetools-uikit/primary-button';
import CONFIG from '../../../configuration';
import initialState from './intialState.json';
import dataFields from './dataFields.json';
import OnSiteMode from './OnSiteMode';
import RedirectModeA from './RedirectModeA';
import RedirectModeB from './RedirectModeB';
import GeneralSettings from './GeneralSettings';
import reducer from './reducer';
import { PaymentContext } from '../../context/payment';
import { useIntl } from 'react-intl';
import messages from './messages';
import { defaultTemplateName } from '../../constants';

const { supportAddress } = CONFIG;
const PaymentMethods = () => {
  const {
    setLoader,
    saveCustomObject,
    customObject,
    fetchWorldlinePaymentOptions,
    activeStore,
    hideToaster,
    showToaster,
    activeCountry,
    activeCurrency,
  } = useContext(PaymentContext);

  const { formatMessage } = useIntl();

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnsiteMode = (field, value) => {
    const payload = { ...state.onSiteMode };

    if (field === 'logo') {
      const imgSet = new Set(payload.logo.value.concat(value));
      payload['logo'] = {
        ...payload['logo'],
        value: [...imgSet],
      };
    } else if (field === 'payButtonLanguage') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        value: state.onSiteMode['payButtonTitle'].values[value],
      };
      payload['payButtonLanguage'] = {
        ...payload['payButtonLanguage'],
        value: value,
      };
    } else if (field === 'payButtonTitle') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        values: {
          ...state.onSiteMode['payButtonTitle'].values,
        },
        value: value,
      };
      payload['payButtonTitle'].values[
        state.onSiteMode['payButtonLanguage'].value
      ] = value;
    } else if (field === '3dsEnablement') {
      payload['3dsEnablement'] = {
        ...payload['3dsEnablement'],
        value: value,
      };
      if (!value) {
        payload['3dsChallenge'] = {
          ...payload['3dsChallenge'],
          value: false,
        };
        payload['3dsExemption'] = {
          ...payload['3dsExemption'],
          value: false,
        };
      }
    } else {
      payload[field] = {
        ...payload[field],
        value: value,
      };
    }

    dispatch({
      type: 'ONSITE-MODE',
      value: payload,
    });
  };

  const handleRedirectModeA = (field, value) => {
    const payload = { ...state.redirectModeA };
    if (field === 'paymentOptions') {
      const paymentPayload = value.map((option) => {
        return {
          ...option,
          enabled: payload['paymentOptions'].find(
            (ele) => ele.label === option.label
          )?.enabled
            ? true
            : false,
        };
      });
      payload['paymentOptions'] = paymentPayload;
    } else if (field === '3dsEnablement') {
      payload['3dsEnablement'] = {
        ...payload['3dsEnablement'],
        value: value,
      };
      if (!value) {
        payload['3dsChallenge'] = {
          ...payload['3dsChallenge'],
          value: false,
        };
        payload['3dsExemption'] = {
          ...payload['3dsExemption'],
          value: false,
        };
      }
    } else
      payload[field] = {
        ...payload[field],
        value: value,
      };

    dispatch({
      type: 'REDIRECT-MODE-A',
      value: payload,
    });
  };

  const handleRedirectModeB = (field, value) => {
    const payload = { ...state.redirectModeB };

    if (field === 'logo') {
      const imgSet = new Set(payload.logo.value.concat(value));
      payload['logo'] = {
        ...payload['logo'],
        value: [...imgSet],
      };
    } else if (field === 'payButtonLanguage') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        value: state.redirectModeB['payButtonTitle'].values[value],
      };
      payload['payButtonLanguage'] = {
        ...payload['payButtonLanguage'],
        value: value,
      };
    } else if (field === 'payButtonTitle') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        values: {
          ...state.redirectModeB['payButtonTitle'].values,
        },
        value: value,
      };
      payload['payButtonTitle'].values[
        state.redirectModeB['payButtonLanguage'].value
      ] = value;
    } else if (field === '3dsEnablement') {
      payload['3dsEnablement'] = {
        ...payload['3dsEnablement'],
        value: value,
      };
      if (!value) {
        payload['3dsChallenge'] = {
          ...payload['3dsChallenge'],
          value: false,
        };
        payload['3dsExemption'] = {
          ...payload['3dsExemption'],
          value: false,
        };
      }
    } else {
      payload[field] = {
        ...payload[field],
        value: value,
      };
    }

    dispatch({
      type: 'REDIRECT-MODE-B',
      value: payload,
    });
  };

  const handleCommonSettings = (field, value) => {
    const payload = { ...state };
    payload[field] = {
      ...payload[field],
      value: value,
    };
    if (field === 'paymentOption') {
      if (value === 'AUTH') {
        payload['authorizationMode'] = {
          ...payload[field],
          value: 'FINAL_AUTHORIZATION',
        };
      } else {
        payload['authorizationMode'] = {
          ...payload[field],
          value: value,
        };
      }
    }

    dispatch({
      type: 'GENERAL-SETTINGS',
      value: payload,
    });
  };

  const handleOptionUpdate = (methods) => {
    handleRedirectModeA(
      'paymentOptions',
      methods.map((method, index) => {
        return {
          ...method,
          enabled: method.enabled ? method.enabled : false,
          displayOrder: index,
        };
      })
    );
  };

  const fetchPaymentMethods = async () => {
    setLoader(true);
    const result = await fetchWorldlinePaymentOptions(
      activeStore,
      activeCountry,
      activeCurrency
    );
    if (result) {
      handleRedirectModeA(
        'paymentOptions',
        result.map((res) => {
          return {
            ...res,
            enabled: true,
            paymentMethodType: res?.paymentMethod ? res?.paymentMethod : '',
          };
        })
      );
    } else {
      handleRedirectModeA(
        'paymentOptions',
        initialState.redirectModeA.paymentOptions
      );
    }
    setLoader(false);
  };

  const camelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };

  const saveFormData = async () => {
    setLoader(true);
    const payload = Object.keys(state).map((key) => {
      let data;
      const sendLoad = {};
      switch (key) {
        case 'onSiteMode':
        case 'redirectModeB':
        case 'redirectModeA':
          data = state[key];
          const dataSet = Object.keys(data);
          for (let dSet of dataSet) {
            if (dSet === 'paymentOptions') {
              sendLoad[dSet] = data[dSet].map((pDat) => {
                if (!data.enabled.value)
                  return {
                    ...pDat,
                    enabled: false,
                    paymentMethod: camelCase(pDat.label),
                  };
                else return { ...pDat, paymentMethod: camelCase(pDat.label) };
              });
            } else if (dSet === 'payButtonTitle') {
              sendLoad[dSet] = data[dSet]?.values;
            } else if (dSet === 'templateFileName') {
              sendLoad[dSet] = data[dSet]?.value.length
                ? data[dSet]?.value.trim()
                : defaultTemplateName;
            } else sendLoad[dSet] = data[dSet]?.value;
          }
          return {
            [key]: sendLoad,
          };
        default:
          return { [key]: state[key].value };
      }
    });

    let saveData = {};
    for (let pData of payload) {
      saveData = { ...saveData, ...pData };
    }

    Object.keys(saveData).forEach((key) =>
      saveData[key] === undefined ? delete saveData[key] : {}
    );

    const final_payload = {
      value: {
        ...customObject?.value,
        merchantReference: saveData.merchantReference.replaceAll(' ', ''),
        authorizationMode: saveData.authorizationMode,
        live: {
          ...customObject?.value?.live,
          ...saveData,
        },
        test: {
          ...customObject?.value?.test,
          ...saveData,
        },
      },
    };
    await saveCustomObject(final_payload);
  };

  useEffect(async () => {
    setLoader(true);
    const payload = JSON.parse(JSON.stringify(initialState));
    if (customObject?.value) {
      const customValue = customObject?.value?.test;
      for (let ds of Object.keys(dataFields)) {
        for (let field of dataFields[ds]) {
          switch (ds) {
            case 'onSiteMode':
            case 'redirectModeA':
            case 'redirectModeB':
              if (field === 'paymentOptions') {
                const response = await fetchWorldlinePaymentOptions(
                  activeStore,
                  activeCountry,
                  activeCurrency
                );
                if (customValue?.[ds]?.[field] !== undefined) {
                  payload[ds][field] = customValue[ds][field].map((payOpt) => {
                    return {
                      ...payOpt,
                      defaultLogo: response?.find(
                        (res) => res.label === payOpt?.label
                      )?.['logo'],
                      paymentMethodType: response?.find(
                        (res) => res.label === payOpt?.label
                      )?.['paymentMethod']
                        ? response?.find(
                            (res) => res.label === payOpt?.label
                          )?.['paymentMethod']
                        : '',
                    };
                  });
                } else {
                  if (response && response.length) {
                    payload[ds][field] = response.map((res) => {
                      return {
                        ...res,
                        enabled: false,
                        defaultLogo: res.logo,
                        paymentMethodType: res?.paymentMethod
                          ? res?.paymentMethod
                          : '',
                      };
                    });
                  }
                }
                break;
              } else if (field === 'payButtonTitle') {
                if (customValue?.[ds]?.[field]) {
                  payload[ds][field].value =
                    customValue?.[ds]?.[field][
                      customValue[ds]['payButtonLanguage']
                    ];
                  payload[ds][field].values = customValue?.[ds]?.[field];
                }
                break;
              } else {
                if (customValue?.[ds]?.[field] !== undefined) {
                  payload[ds][field].value = customValue?.[ds]?.[field];
                }
                break;
              }
            case 'general':
              if (customValue?.[field] !== undefined) {
                payload[field].value = customValue?.[field];
              }
              if (
                customObject?.value &&
                customObject?.value?.merchantReference
              ) {
                payload['merchantReference'].value =
                  customObject?.value?.merchantReference.replaceAll(' ', '');
              }
              if (field === 'paymentOption') {
                payload['paymentOption'].value =
                  customObject?.value?.authorizationMode === 'SALE'
                    ? customObject?.value?.authorizationMode
                    : 'AUTH';
              }
              break;
          }
        }
      }
    }
    setLoader(false);
    dispatch({
      type: 'UPDATE-STATE',
      value: payload,
    });
  }, [customObject]);

  return (
    <PageWrapper title={'Payment Methods'}>
      <div className="payment-options-wrapper mb-2">
        <div className="save-wrapper mb-2">
          <h2>{formatMessage(messages.generalTitle)}</h2>
          <PrimaryButton
            label={formatMessage(messages.generalSaveBtn)}
            onClick={() => saveFormData()}
            isDisabled={false}
          />
        </div>
        <OnSiteMode
          onSiteMode={state.onSiteMode}
          handleOnsiteMode={handleOnsiteMode}
        />
        <RedirectModeA
          redirectModeA={state.redirectModeA}
          handleRedirectModeA={handleRedirectModeA}
          handleOptionUpdate={handleOptionUpdate}
          fetchPaymentMethods={fetchPaymentMethods}
        />
        <RedirectModeB
          redirectModeB={state.redirectModeB}
          handleRedirectModeB={handleRedirectModeB}
        />
        <GeneralSettings
          state={state}
          handleCommonSettings={handleCommonSettings}
        />
        <div className="save-wrapper algin-end">
          <PrimaryButton
            label={formatMessage(messages.generalSaveBtn)}
            onClick={() => saveFormData()}
            isDisabled={false}
          />
        </div>
      </div>
      <p className="supportmail">
        {formatMessage(messages.generalSupportMail)}
        <a href={supportAddress}>{supportAddress}</a>
      </p>
    </PageWrapper>
  );
};

PaymentMethods.displayName = 'PaymentMethods';

export default PaymentMethods;
