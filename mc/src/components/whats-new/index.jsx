import React from 'react';
import Link from '@commercetools-uikit/link';
import './style.css';

const WhatsNew = () => {
  return (
    <div>
      <div className="relese-notes-wrapper">
        <Link
          className="external-link"
          isExternal={true}
          to={
            'https://bitbucket.org/tryzens-commercetool/worldline/src/main/README.md'
          }
        >
          What's New
        </Link>
      </div>
    </div>
  );
};

export default WhatsNew;
