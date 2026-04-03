import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { PaymentContext } from '../../context/payment/index';
import Label from '@commercetools-uikit/label';
import { useIntl } from 'react-intl';
import messages from './messages';
import { useLocation } from 'react-router-dom';
import { entryPointUriPath } from '../../constants';

const PageWrapper = ({ children }) => {
  const projectKey = useApplicationContext((context) => context.project.key);
  const locale = useApplicationContext((context) => context.dataLocale);
  const { formatMessage } = useIntl();
  const location = useLocation();

  const {
    fetchStores,
    fetchCustomObjects,
    setActiveStore,
    activeStore,
    setCustomObject,
    setStores,
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
  } = useContext(PaymentContext);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const res = await fetchProject();
      if (cancelled) return;
      if (res?.countries) {
        setCountries(res.countries);
        if (activeCountry === null) setActiveCountry(res.countries[0]);
      }
      if (res?.currencies) {
        setCurrencies(res.currencies);
        if (activeCurrency === null) setActiveCurrency(res.currencies[0]);
      }

      const response = await fetchStores();
      if (cancelled) return;
      if (response?.length) {
        if (activeStore === null) setActiveStore(response[0]);
        setStores(response);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [projectKey]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const response = await fetchCustomObjects(activeStore);
      if (!cancelled) setCustomObject(response || {});
    };
    load();
    return () => { cancelled = true; };
  }, [stores, activeCountry, activeCurrency]);

  const getStoreName = (str) => {
    return str?.name?.[locale] || str?.name?.['en'] || str?.key || '';
  };

  const isPaymentMethodsPage = () => {
    const pathname = location.pathname;

    return pathname.endsWith(entryPointUriPath) || pathname.endsWith(`${entryPointUriPath}/`);
  };

  return (
    <div className="page-wrapper">
      <div className="dropdown-container flex">
        {stores?.length ? (
          <div className="select-dropdown-wrapper">
            <Label>{formatMessage(messages.stores)}</Label>
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
        ) : null}
        {countries?.length && isPaymentMethodsPage() ? (
          <div className="select-dropdown-wrapper">
            <Label>{formatMessage(messages.countries)}</Label>
            <Select
              className="select-dropdown"
              onChange={(e) =>
                setActiveCountry(
                  countries.filter((con) => con === e.target.value)[0]
                )
              }
              displayEmpty
              value={activeCountry}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {countries.map((str, index) => (
                <MenuItem key={`con-${index}`} value={str}>
                  {str}
                </MenuItem>
              ))}
            </Select>
          </div>
        ) : null}
        {currencies?.length && isPaymentMethodsPage() ? (
          <div className="select-dropdown-wrapper">
            <Label>{formatMessage(messages.currencies)}</Label>
            <Select
              className="select-dropdown"
              onChange={(e) =>
                setActiveCurrency(
                  currencies.filter((cur) => cur === e.target.value)[0]
                )
              }
              displayEmpty
              value={activeCurrency}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {currencies.map((str, index) => (
                <MenuItem key={`cur-${index}`} value={str}>
                  {str}
                </MenuItem>
              ))}
            </Select>
          </div>
        ) : null}
      </div>
      <div>
        <div className={`payment-wrapper`}>{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
