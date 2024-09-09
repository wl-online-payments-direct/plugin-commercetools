import React, { useContext } from 'react';
import AdyenPaymentProvider, { AdyenContext } from './payment/adyen';
import WorldlinePaymentProvider, { WorldlineContext } from './payment/worldline';

const CheckoutContext = React.createContext({});

const CheckoutProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <CheckoutContext.Provider value={{}}>
      <AdyenPaymentProvider>
        <WorldlinePaymentProvider>{children}</WorldlinePaymentProvider>
      </AdyenPaymentProvider>
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;

export const useCheckout = () => useContext(AdyenContext);
export const useWorldlineCheckout = () => useContext(WorldlineContext);
