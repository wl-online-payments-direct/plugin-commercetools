import React, { useContext, useEffect } from 'react';
import './style.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { PaymentContext } from '../../context/payment/index';

const PageWrapper = ({ children }) => {
  const projectKey = useApplicationContext((context) => context.project.key);
  const locale = useApplicationContext((context) => context.dataLocale);

  const {
    fetchStores,
    fetchCustomObjects,
    setActiveStore,
    activeStore,
    setCustomObject,
    setStores,
    stores,
  } = useContext(PaymentContext);

  useEffect(async () => {
    const response = await fetchStores();
    if (activeStore === null) setActiveStore(response[0]);
    setStores(response);
  }, [projectKey]);

  useEffect(async () => {
    const response = await fetchCustomObjects(activeStore);
    setCustomObject(response);
  }, [stores]);

  const getStoreName = (str) => {
    return str.name[locale] ? str.name[locale] : str.name['en'];
  };

  return (
    <div className="page-wrapper">
      {stores?.length ? (
        <div className="store-container">
          <div className="store-dropdown-container">
            <Select
              className="select-dropdown"
              onChange={(e) =>
                setActiveStore(
                  stores.filter((store) => store?.key === e.target.value)[0]
                )
              }
              displayEmpty
              value={activeStore?.key}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {stores.map((str, index) => (
                <MenuItem key={`store-${index}`} value={str?.key}>
                  {getStoreName(str)}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      ) : null}
      <div className="payment-wrapper">{children}</div>
    </div>
  );
};

export default PageWrapper;
