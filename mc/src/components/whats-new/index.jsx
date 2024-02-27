import React from 'react';
import Link from '@commercetools-uikit/link';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import './style.css';

const WhatsNew = () => {
  const { readMeLink } = useApplicationContext(
    (context) => context.environment
  );
  return (
    <div>
      <div className="relese-notes-wrapper">
        <Link className="external-link" isExternal={true} to={readMeLink}>
          What's New
        </Link>
      </div>
    </div>
  );
};

export default WhatsNew;
