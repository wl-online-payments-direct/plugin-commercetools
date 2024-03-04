import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { PaymentContext } from '../../context/payment/index';
import Label from '@commercetools-uikit/label';

const PageWrapper = ({ children }) => {
  const projectKey = useApplicationContext((context) => context.project.key);
  const locale = useApplicationContext((context) => context.dataLocale);
  const [active, setActive] = useState(false);

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

  useEffect(async () => {
    const res = await fetchProject();
    if (res?.countries) setCountries(res.countries);
    if (res?.currencies) setCurrencies(res.currencies);
    const response = await fetchStores();
    if (activeStore === null) setActiveStore(response[0]);
    setStores(response);
  }, [projectKey]);

  useEffect(async () => {
    const response = await fetchCustomObjects(activeStore);
    setCustomObject(response);
  }, [stores]);

  useEffect(() => {
    setActiveCurrency(null);
    setActiveCountry(null);
    setActive(false);
  }, [activeStore]);

  useEffect(() => {
    if (activeCurrency && activeCurrency) setActive(true);
  }, [activeCountry, activeCurrency]);

  const getStoreName = (str) => {
    return str.name[locale] ? str.name[locale] : str.name['en'];
  };

  return (
    <div className="page-wrapper">
      <div className="dropdown-container flex">
        {stores?.length ? (
          <div className="select-dropdown-wrapper">
            <Label>Stores</Label>
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
        {countries?.length ? (
          <div className="select-dropdown-wrapper">
            <Label>Countries</Label>
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
        {currencies?.length ? (
          <div className="select-dropdown-wrapper">
            <Label>Currencies</Label>
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
        {active ? null : <div className="payment-wrapper-overlay">{''}</div>}
        <div className={`payment-wrapper ${active ? '' : 'transparent'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
