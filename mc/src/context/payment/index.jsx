import React, { createContext, useEffect, useState } from 'react';
import {
  getStores,
  getCustomObject,
  createCustomObject,
} from '../../ct-methods/customObject';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CONFIG from '../../../configuration';

export const PaymentContext = createContext();
const { CONTAINER_NAME } = CONFIG;

const PaymentProvider = ({ children }) => {
  const projectKey = useApplicationContext((context) => context.project.key);
  const [activeStore, setActiveStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customObject, setCustomObject] = useState({});
  const [toaster, setToaster] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    transition: Slide,
    severity: 'info',
    message: '',
  });
  const { vertical, horizontal, open, transition } = toaster;

  const fetchStores = async () => {
    setLoader(true);
    try {
      const { results } = await getStores(projectKey);
      setLoader(false);
      return results;
    } catch (err) {
      console.error('Failed to fetch stores');
      showToaster({
        severity: 'error',
        open: true,
        message: 'Failed to fetch stores',
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
        console.error('Failed to fetch custom objects');
        showToaster({
          severity: 'error',
          open: true,
          message: 'Failed to fetch custom objects',
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
        const response = await createCustomObject(payload, projectKey);
        if (response.id) {
          showToaster({
            severity: 'success',
            open: true,
            message: 'Payment settings saved successfully',
          });
          const response = await fetchCustomObjects(activeStore);
          setCustomObject(response);
        }
      } catch (err) {
        console.error('Error saving custom object', err);
        showToaster({
          severity: 'error',
          open: true,
          message: 'Failed to save data',
        });
        setLoader(false);
      }
    } else {
      console.error('No store selected');
      showToaster({
        severity: 'error',
        open: true,
        message: 'No store selected',
      });
      setLoader(false);
    }
  };

  useEffect(async () => {
    const response = await fetchCustomObjects(activeStore);
    setCustomObject(response);
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
        customObject,
        activeStore,
        stores,
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
        autoHideDuration={6000}
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
