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
  downloadLogs,
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
      hideToaster();
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
      hideToaster();
    }
  };

  const fetchCustomObjects = async (activeStore) => {
    setLoader(true);
    if (activeStore?.key) {
      try {
        const response = await getCustomObject(projectKey, activeStore?.key);
        setLoader(false);
        hideToaster('success');
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
        hideToaster();
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
          hideToaster('success');
        }
      } catch (err) {
        console.error(formatMessage(messages.saveCustomObjectErrMsg), err);
        showToaster({
          severity: 'error',
          open: true,
          message: formatMessage(messages.saveCustomObjectErrMsg),
        });
        hideToaster();
      }
      setLoader(false);
    } else {
      console.error(formatMessage(messages.noStoreSelectedErrMsg));
      showToaster({
        severity: 'error',
        open: true,
        message: formatMessage(messages.noStoreSelectedErrMsg),
      });
      setLoader(false);
      hideToaster();
    }
  };

  const fetchWorldlinePaymentOptions = async (
    activeStore,
    activeCountry,
    activeCurrency
  ) => {
    setLoader(true);
    if (activeStore?.key && activeCountry && activeCurrency) {
      try {
        const response = await getPaymentMethods(
          projectKey,
          activeStore?.key,
          apiHost,
          activeCountry,
          activeCurrency
        );
        if (response.statusCode === 200) {
          const { result } = response;
          setLoader(false);
          showToaster({
            severity: 'success',
            open: true,
            message: formatMessage(messages.refreshPaymentMethodsSuccessMsg),
          });
          hideToaster('success');
          return result;
        } else {
          setLoader(false);
          showToaster({
            severity: 'error',
            open: true,
            message: formatMessage(messages.refreshPaymentMethodsErrMsg),
          });
          hideToaster();
          return null;
        }
      } catch (err) {
        setLoader(false);
        showToaster({
          severity: 'error',
          open: true,
          message: formatMessage(messages.refreshPaymentMethodsErrMsg),
        });
        hideToaster();
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

  const downloadLog = async () => {
    setLoader(true);
    try {
      await downloadLogs(apiHost, projectKey);
      setLoader(false);
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
          hideToaster('success');
          return result;
        } else {
          showToaster({
            severity: 'error',
            open: true,
            message: response?.message,
          });
          hideToaster();
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
      hideToaster();
    }
  };

  const sendRequest = async (payload) => {
    setLoader(true);
    try {
      const response = await requestNewFeature(payload, apiHost, projectKey);
      if (response && response.statusCode === 200) {
        showToaster({
          severity: 'success',
          open: true,
          message: formatMessage(messages.sendRequestSuccessMsg),
        });
        hideToaster('success');
      } else {
        showToaster({
          severity: 'error',
          open: true,
          message: formatMessage(messages.sendRequestErrMsg),
        });
        console.error(response.message);
        hideToaster();
      }
    } catch (err) {
      console.error(err);
      showToaster({
        severity: 'error',
        open: true,
        message: formatMessage(messages.sendRequestErrMsg),
      });
      hideToaster();
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
      hideToaster();
    } catch (err) {
      console.error(formatMessage(messages.checkConnectionErrMsg), err.message);
      setLoader(false);
    }
  };

  useEffect(async () => {
    const response = await fetchCustomObjects(activeStore);
    setCustomObject(response);
    setLoader(false);
  }, [activeStore]);

  const showToaster = async (options) => {
    setToaster({
      ...toaster,
      ...options,
    });
  };

  const hideToaster = async (severity = 'error') => {
    setTimeout(() => {
      setToaster({ ...toaster, severity: severity, open: false, message: '' });
    }, 3000);
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
        downloadLog,
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
