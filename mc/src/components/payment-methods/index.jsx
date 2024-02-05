import React, { useContext, useReducer, useEffect } from 'react';
import './style.css';
import PageWrapper from '../page-wrapper';
import ToggleInput from '@commercetools-uikit/toggle-input';
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

const { emailAddress } = CONFIG;
const PaymentMethods = () => {
  const {
    setLoader,
    saveCustomObject,
    customObject,
    fetchWorldlinePaymentOptions,
    activeStore,
    hideToaster,
  } = useContext(PaymentContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnsiteMode = (field, value) => {
    const payload = { ...state.onSiteMode };
    payload[field] = {
      ...payload[field],
      value: value,
    };

    if (field === 'payButtonLanguage') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        value: state.onSiteMode['payButtonTitle'].values[value],
      };
    }

    if (field === 'payButtonTitle') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        values: {
          ...state.onSiteMode['payButtonTitle'].values,
          [state.onSiteMode['payButtonLanguage'].value]: value,
        },
      };
    }

    dispatch({
      type: 'ONSITE-MODE',
      value: payload,
    });

    setTimeout(() => {
      hideToaster();
    }, 3000);
  };

  const handleRedirectModeA = (field, value) => {
    const payload = { ...state.redirectModeA };
    if (field === 'paymentOptions') payload['paymentOptions'] = value;
    else
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
    payload[field] = {
      ...payload[field],
      value: value,
    };

    if (field === 'payButtonLanguage') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        value: state.redirectModeB['payButtonTitle'].values[value],
      };
    }

    if (field === 'payButtonTitle') {
      payload['payButtonTitle'] = {
        ...payload['payButtonTitle'],
        values: {
          ...state.redirectModeB['payButtonTitle'].values,
          [state.redirectModeB['payButtonLanguage'].value]: value,
        },
      };
    }

    dispatch({
      type: 'REDIRECT-MODE-B',
      value: payload,
    });

    setTimeout(() => {
      hideToaster();
    }, 3000);
  };

  const handleCommonSettings = (field, value) => {
    const payload = { ...state };
    payload[field] = {
      ...payload[field],
      value: value,
    };

    if (field === 'placeOrderLanguage') {
      payload['placeOrder'] = {
        ...payload['placeOrder'],
        value: state['placeOrder'].values[value],
      };
    }

    if (field === 'placeOrder') {
      payload['placeOrder'] = {
        ...payload['placeOrder'],
        values: {
          ...state['placeOrder'].values,
          [state['placeOrderLanguage'].value]: value,
        },
      };
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
        return { ...method, displayOrder: index };
      })
    );
  };

  const handleLogoUpload = (e) => {};

  const fetchPaymentMethods = async () => {
    setLoader(true);
    const result = await fetchWorldlinePaymentOptions(activeStore);
    if (result) {
      handleRedirectModeA('paymentOptions', result);
    } else {
      handleRedirectModeA(
        'paymentOptions',
        initialState.redirectModeA.paymentOptions
      );
    }
    setLoader(false);
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
            if (dSet === 'paymentOptions') sendLoad[dSet] = data[dSet];
            else sendLoad[dSet] = data[dSet]?.value;
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

  useEffect(() => {
    const payload = JSON.parse(JSON.stringify(initialState));
    if (customObject?.value) {
      const customValue = customObject?.value?.test;
      for (let ds of Object.keys(dataFields)) {
        for (let field of dataFields[ds]) {
          switch (ds) {
            case 'onSiteMode':
            case 'redirectModeA':
            case 'redirectModeB':
              if (field === 'paymentOptions' && customValue?.[ds]?.[field]) {
                payload[ds][field] = customValue?.[ds]?.[field];
                break;
              } else {
                if (customValue?.[ds]?.[field])
                  payload[ds][field].value = customValue?.[ds]?.[field];
                break;
              }
            case 'general':
              if (customValue?.[field])
                payload[field].value = customValue?.[field];
              break;
          }
        }
      }
    }
    dispatch({
      type: 'UPDATE-STATE',
      value: payload,
    });
  }, [customObject]);

  return (
    <PageWrapper title={'Payment Methods'}>
      <div className="enable-worldline flex algin-end mb-1">
        <h3 className="section-header">Enable Worldline Checkout</h3>
        <ToggleInput
          size={'big'}
          isDisabled={false}
          isChecked={state.enabled.value}
          onChange={(e) => {
            dispatch({
              type: 'ENABLE-WORLDLINE',
              value: e.target.checked,
            });
          }}
        />
      </div>
      <div className="payment-options-wrapper mb-2">
        <div className="save-wrapper mb-2">
          <h2>
            Please select a combination of one or more checkout types to design
            your checkout experience
          </h2>
          <PrimaryButton
            label="Save Changes"
            onClick={() => saveFormData()}
            isDisabled={false}
          />
        </div>
        <OnSiteMode
          onSiteMode={state.onSiteMode}
          handleOnsiteMode={handleOnsiteMode}
          handleLogoUpload={handleLogoUpload}
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
          handleLogoUpload={handleLogoUpload}
        />
        <GeneralSettings
          state={state}
          handleCommonSettings={handleCommonSettings}
        />
        <div className="save-wrapper algin-end">
          <PrimaryButton
            label="Save Changes"
            onClick={() => saveFormData()}
            isDisabled={false}
          />
        </div>
      </div>
      <p className="supportmail">
        Support Email : <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
      </p>
    </PageWrapper>
  );
};

PaymentMethods.displayName = 'PaymentMethods';

export default PaymentMethods;
