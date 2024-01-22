import React, { useContext, useState, useReducer, useEffect } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import './style.css';
import PageWrapper from '../page-wrapper';
import ToggleInput from '@commercetools-uikit/toggle-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import {
  createCustomObject,
  getCustomObject,
} from '../../ct-methods/customObject';
import CONFIG from '../../../configuration';
import initialState from './intialState.json';
import dataFields from './dataFields.json';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import OnSiteMode from './OnSiteMode';
import RedirectModeA from './RedirectModeA';
import RedirectModeB from './RedirectModeB';
import GeneralSettings from './GeneralSettings';
import reducer from './reducer';

const { emailAddress } = CONFIG;

const PaymentMethods = () => {
  const [apiData, setAPIData] = useState({});
  const [loading, setLoading] = useState(true);

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
        value: state.onSiteMode[field].values[value],
      };
    }

    dispatch({
      type: 'ONSITE-MODE',
      value: payload,
    });
  };

  const handleRedirectModeA = (field, value) => {
    const payload = { ...state.redirectModeA };
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

    if (field === 'placeOrderLanguage') {
      payload['placeOrder'] = {
        ...payload['placeOrder'],
        value: state[field].values[value],
      };
    }

    dispatch({
      type: 'GENERAL-SETTINGS',
      value: payload,
    });
  };

  const handleOptionUpdate = (option, field, value) => {
    const payload = state.redirectModeA.paymentOptions;
    payload[option][field] = value;
    handleRedirectModeA('payOptionUpdate', payload);
  };

  const handleLogoUpload = (e) => {};
  const fetchPaymentMethods = () => {};

  const saveFormData = async () => {
    setLoading(true);
    const payload = Object.keys(state).map((key) => {
      switch (key) {
        case 'onSiteMode':
        case 'redirectModeA':
        case 'redirectModeB':
          const data = state[key];
          return Object.keys(data)
            .map((key1) => {
              return { [key + '_' + key1]: data[key1].value };
            })
            .flat();
        default:
          return { [key]: state[key].value };
      }
    });

    let saveData = {};

    for (let pData of payload) {
      if (Array.isArray(pData)) {
        pData.forEach((pValue) => Object.assign(saveData, pValue));
      } else {
        Object.assign(saveData, pData);
      }
    }
    Object.keys(saveData).forEach((key) =>
      saveData[key] === undefined ? delete saveData[key] : {}
    );

    const final_payload = {
      ...apiData,
      value: {
        ...apiData.value,
        live: {
          ...apiData.value.live,
          ...saveData,
        },
        test: {
          ...apiData.value.test,
          ...saveData,
        },
      },
    };

    setAPIData(final_payload);
    try {
      const response = await createCustomObject(final_payload, projectKey);
      if (response.id) {
        getCustomObjectData(projectKey);
      }
    } catch (error) {
      console.error('Error saving custom object:', error);
      setLoading(false);
    }
  };

  const projectKey = useApplicationContext(context => context.project.key);

  useEffect(() => {
    projectKey && getCustomObjectData(projectKey);
  }, [projectKey]);

  const getCustomObjectData = async (projectKey) => {
    try {
      const response = await getCustomObject(projectKey);
      if (response?.value) {
        setAPIData(response);
        let payload = initialState;
        for (let ds of Object.keys(dataFields)) {
          for (let field of dataFields[ds]) {
            if (ds !== 'general')
              payload[ds][field].value =
                response.value.test[payload[ds][field].key];
            else payload[field].value = response.value.test[payload[field].key];
          }
        }
        dispatch({
          type: 'UPDATE_STATE',
          value: payload,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching custom object:', error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner size="l">Loading</LoadingSpinner>
      ) : (
        <PageWrapper title={'Payment Methods'}>
          <div className="enable-worldline flex algin-end mb-1">
            <h3 className="section-header">Enable Worldline Checkout</h3>
            <ToggleInput
              size={'big'}
              isDisabled={false}
              value={state.enabled.value}
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
                Please select a combination of one or more checkout types to
                design your checkout experience
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
            Support Email :{' '}
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
          </p>
        </PageWrapper>
      )}
    </>
  );
};

PaymentMethods.displayName = 'PaymentMethods';

export default PaymentMethods;
