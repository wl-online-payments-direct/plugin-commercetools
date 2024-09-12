import React, { memo, useState, useEffect } from 'react';
import { useWorldlineCheckout } from 'components/commercetools-ui/organisms/checkout/provider';
import useScript from 'components/commercetools-ui/organisms/checkout/provider/payment/worldline/hooks/useScript';

const Worldline = memo(() => {
  const { iframeLoaded, fetchHostedTokenizationURL } = useWorldlineCheckout();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useScript(setScriptLoaded);

  useEffect(() => {
    if (scriptLoaded) {
      fetchHostedTokenizationURL();
    }
  }, [scriptLoaded]);

  useEffect(() => {
    const hasLoadedScript = document.getElementById('worldline-script');
    if (hasLoadedScript) setScriptLoaded(true);
  }, []);

  return (
    <>
      {!iframeLoaded && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center	bg-transparent">
          <span className="relative h-20 w-20">
            <span className="relative top-10 flex h-20 w-20 animate-spin justify-end" style={{ margin: 'auto' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  className="fill-gray-700"
                  d="M8 10H10C10 8.68678 9.74134 7.38642 9.2388 6.17317C8.73625 4.95991 7.99965 3.85752 7.07107 2.92893C6.14248 2.00035 5.04009 1.26375 3.82683 0.761205C2.61358 0.258658 1.31322 0 0 0V2C2.12173 2 4.15656 2.84285 5.65685 4.34315C7.15715 5.84344 8 7.87827 8 10Z"
                />
              </svg>
            </span>
          </span>
        </div>
      )}
      <div id="div-hosted-tokenization"></div>
      <style>
        {`iframe {
              border: none;
              width: 450px !important;
              max-height: 450px !important;
              overflow: scroll !important;
            }`}
      </style>
    </>
  );
});

Worldline.displayName = 'Worldline';

export default Worldline;
