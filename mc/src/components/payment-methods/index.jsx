import React, { useContext, useState, useReducer, useEffect } from 'react';
import './style.css';
import PageWrapper, { PaymentContext } from '../page-wrapper';
import ToggleInput from '@commercetools-uikit/toggle-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import {
  createCustomObject,
  getCustomObject,
} from '../../ct-methods/customObject';
import { CONTAINER_NAME, CONTAINER_KEY } from '../../../configuration';
import initialState from './intialState.json';
import dataFields from './dataFields.json';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import OnSiteMode from './OnSiteMode';
import RedirectModeA from './RedirectModeA';
import RedirectModeB from './RedirectModeB';
import GeneralSettings from './GeneralSettings';

const PaymentMethods = () => {
  const payment = useContext(PaymentContext);
  const [apiData, setAPIData] = useState({});
  const [loading, setLoading] = useState(true);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE-STATE':
        return {
          ...state,
          ...action.value,
        };
      case 'ENABLE-WORLDLINE':
        return {
          ...state,
          enabled: {
            value: action.value,
          },
        };
      case 'ONSITE-MODE':
        return {
          ...state,
          onSiteMode: {
            ...action.value,
          },
        };
      case 'REDIRECT-MODE-A':
        return {
          ...state,
          redirectModeA: {
            ...action.value,
          },
        };
      case 'REDIRECT-MODE-B':
        return {
          ...state,
          redirectModeB: {
            ...action.value,
          },
        };
      case 'GENERAL-SETTINGS':
        return {
          ...action.value,
        };
      default:
        return state;
    }
  };

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
      const response = await createCustomObject(final_payload);
      if (response.id) {
        console.log('Config settings saved successfully...');
        getCustomObjectData();
      }
    } catch (error) {
      console.error('Error saving custom object:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomObjectData();
  }, []);

  const getCustomObjectData = async () => {
    try {
      const response = await getCustomObject(CONTAINER_NAME, CONTAINER_KEY);
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
            />
            <RedirectModeA
              redirectModeA={state.redirectModeA}
              handleRedirectModeA={handleRedirectModeA}
              handleOptionUpdate={handleOptionUpdate}
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
                label="Save Changes"
                onClick={() => saveFormData()}
                isDisabled={false}
              />
            </div>
          </div>
          <p class="supportmail">
            Support Email :{' '}
            <a href="mailto:dl-dl_shoppingcarts@worldline.com">
              dl-dl_shoppingcarts@worldline.com
            </a>
          </p>
        </PageWrapper>
      )}
    </>
  );
};

PaymentMethods.displayName = 'PaymentMethods';

export default PaymentMethods;
