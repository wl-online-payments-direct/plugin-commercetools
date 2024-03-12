import React, { createContext, useEffect, useState } from 'react';
import {
  getStores,
  getCustomObject,
  createCustomObject,
  getPaymentMethods,
  uploadImages,
  testConnection,
  requestNewFeature,
  getProject,
  getPluginVersion,
} from '../../ct-methods';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CONFIG from '../../../configuration';
import { useIntl } from 'react-intl';
import messages from './messages';

export const PaymentContext = createContext();
const { CONTAINER_NAME } = CONFIG;

const PaymentProvider = ({ children }) => {
  const projectKey = useApplicationContext((context) => context.project.key);
  const apiHost = useApplicationContext(
    (context) => context.environment.apiHost
  );
  const { formatMessage } = useIntl();

  const sourcePackageLink = useApplicationContext(
    (context) => context.environment.sourcePackageLink
  );

  const [activeStore, setActiveStore] = useState(null);
  const [activeCurrency, setActiveCurrency] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [stores, setStores] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customObject, setCustomObject] = useState({});
  const [toaster, setToaster] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    transition: Slide,
    severity: 'success',
    message: '',
    autoHideDuration: 3000,
  });
  const { vertical, horizontal, open, transition } = toaster;

  const fetchProject = async () => {
    setLoader(true);
    try {
      const response = await getProject(projectKey);
      setLoader(false);
      return response;
    } catch (err) {
      console.error(formatMessage(messages.fetchProjectErrMsg));
      showToaster({
        severity: 'error',
        open: true,
        message: formatMessage(messages.fetchProjectErrMsg),
      });
      setLoader(false);
    }
  };

  const fetchStores = async () => {
    setLoader(true);
    try {
      const { results } = await getStores(projectKey);
      setLoader(false);
      return results;
    } catch (err) {
      console.error(formatMessage(messages.fetchStoreErrMsg));
      showToaster({
        severity: 'error',
        open: true,
        message: formatMessage(messages.fetchStoreErrMsg),
      });
      setLoader(false);
    }
  };

  const fetchCustomObjects = async (activeStore) => {
    setLoader(true);
    if (activeStore?.key) {
      try {
        const response = await getCustomObject(projectKey, activeStore?.key);
        setLoader(false);
        hideToaster();
        if (response.value) {
          return response;
        } else {
          return {};
        }
      } catch (err) {
        console.error(formatMessage(messages.fetchCustomObjectErrMsg));
        showToaster({
          severity: 'error',
          open: true,
          message: formatMessage(messages.fetchCustomObjectErrMsg),
        });
        setLoader(false);
      }
    }
  };

  const saveCustomObject = async (payload) => {
    setLoader(true);
    if (activeStore?.key) {
      try {
        payload.key = activeStore.key;
        payload.container = CONTAINER_NAME;
        payload.value.country = activeCountry;
        payload.value.currency = activeCurrency;
        const response = await createCustomObject(payload, projectKey);
        if (response.id) {
          showToaster({
            severity: 'success',
            open: true,
            message: formatMessage(messages.saveCustomObjectSuccessMsg),
          });
          const response = await fetchCustomObjects(activeStore);
          setCustomObject(response);
        }
      } catch (err) {
        console.error(formatMessage(messages.saveCustomObjectErrMsg), err);
        showToaster({
          severity: 'error',
          open: true,
          message: formatMessage(messages.saveCustomObjectErrMsg),
        });
        setLoader(false);
      }
    } else {
      console.error(formatMessage(messages.noStoreSelectedErrMsg));
      showToaster({
        severity: 'error',
        open: true,
        message: formatMessage(messages.noStoreSelectedErrMsg),
      });
      setLoader(false);
    }
  };

  const fetchWorldlinePaymentOptions = async (activeStore) => {
    setLoader(true);
    if (activeStore?.key) {
      try {
        const response = await getPaymentMethods(
          projectKey,
          activeStore?.key,
          apiHost
        );
        if (response.statusCode === 200) {
          const { result } = response;
          setLoader(false);
          showToaster({
            severity: 'success',
            open: true,
            message: formatMessage(messages.refreshPaymentMethodsSuccessMsg),
          });
          return result;
        } else {
          setLoader(false);
          showToaster({
            severity: 'error',
            open: true,
            message: formatMessage(messages.refreshPaymentMethodsErrMsg),
          });
          return null;
        }
      } catch (err) {
        setLoader(false);
        showToaster({
          severity: 'error',
          open: true,
          message: formatMessage(messages.refreshPaymentMethodsErrMsg),
        });
        return null;
      }
    }
  };

  const fetchPluginVersion = async () => {
    setLoader(true);
    try {
      const {
        payload: {
          blob: { rawLines },
        },
      } = await getPluginVersion(sourcePackageLink);
      if (response) {
        const { version } = JSON.parse(rawLines.join(' '));
        setLoader(false);
        return version;
      } else {
        setLoader(false);
        return null;
      }
    } catch (err) {
      setLoader(false);
      return null;
    }
  };

  const imageUploader = async (files, toasterFlag) => {
    setLoader(true);
    try {
      var formdata = new FormData();
      for (let file of files) {
        formdata.append('images', file, file.name);
      }
      const response = await uploadImages(projectKey, formdata, apiHost);
      if (response) {
        const { result, statusCode } = response;
        if (statusCode === 200) {
          setLoader(false);
          if (toasterFlag)
            showToaster({
              severity: 'success',
              open: true,
              message: formatMessage(messages.imageUploadSuccessMsg),
            });
          return result;
        } else {
          showToaster({
            severity: 'error',
            open: true,
            message: response?.message,
          });
        }
      }
    } catch (err) {
      console.error(formatMessage(messages.imageUploadErrMsg), err);
      showToaster({
        severity: 'error',
        open: true,
        message: formatMessage(messages.imageUploadErrMsg),
      });
      setLoader(false);
    }
  };

  const sendRequest = async (payload) => {
    setLoader(true);
    try {
      const response = await requestNewFeature(payload, apiHost, projectKey);
      if (response && response.statusCode === 200)
        showToaster({
          severity: 'success',
          open: true,
          message: formatMessage(messages.sendRequestSuccessMsg),
        });
    } catch (err) {
      console.error(err);
      showToaster({
        severity: 'error',
        open: true,
        message: formatMessage(messages.sendRequestErrMsg),
      });
    }
    setLoader(false);
  };

  const checkConnection = async (payload) => {
    setLoader(true);
    try {
      const response = await testConnection(projectKey, apiHost, payload);
      if (response.statusCode === 200) {
        setLoader(false);
        return response.result;
      } else {
        showToaster({
          severity: 'error',
          open: true,
          message: formatMessage(messages.checkConnectionErrMsg),
        });
      }
    } catch (err) {
      console.error(formatMessage(messages.checkConnectionErrMsg), err.message);
      setLoader(false);
    }
  };

  useEffect(async () => {
    const response = await fetchCustomObjects(activeStore);
    setCustomObject(response);
    setLoader(false);
    hideToaster();
  }, [activeStore]);

  const showToaster = async (options) => {
    setToaster({
      ...toaster,
      ...options,
    });
  };

  const hideToaster = async () => {
    setToaster({ ...toaster, open: false, message: '' });
  };

  const setLoader = async (flag) => {
    setLoading(flag);
  };

  return (
    <PaymentContext.Provider
      value={{
        fetchStores,
        showToaster,
        hideToaster,
        setLoader,
        fetchCustomObjects,
        setStores,
        setActiveStore,
        setCustomObject,
        saveCustomObject,
        fetchWorldlinePaymentOptions,
        imageUploader,
        sendRequest,
        checkConnection,
        customObject,
        activeStore,
        stores,
        fetchProject,
        setCountries,
        setCurrencies,
        countries,
        currencies,
        setActiveCurrency,
        setActiveCountry,
        activeCurrency,
        activeCountry,
        fetchPluginVersion,
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1500 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
      <Snackbar
        className="snack-bar"
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
        autoHideDuration={3000}
        TransitionComponent={transition}
      >
        <Alert
          onClose={() => {
            hideToaster();
          }}
          severity={toaster.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
