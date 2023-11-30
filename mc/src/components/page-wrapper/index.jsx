import React, { createContext, useEffect, useState } from 'react';
import './style.css';
import { PageContentFull } from '@commercetools-frontend/application-components';
import Grid from '@commercetools-uikit/grid';

export const PaymentContext = createContext(null);

const PageWrapper = ({ children, title }) => {
  const [pageData, setPageData] = useState({});

  return (
    <PaymentContext.Provider value={pageData}>
      <PageContentFull>
        <Grid className="page-wrapper">
          <div className="payment-wrapper">{children}</div>
        </Grid>
      </PageContentFull>
    </PaymentContext.Provider>
  );
};

export default PageWrapper;
