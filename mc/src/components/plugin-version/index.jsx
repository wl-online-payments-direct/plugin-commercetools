import React, { useEffect, useContext, useState } from 'react';
import Link from '@commercetools-uikit/link';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { PaymentContext } from '../../context/payment';

const PluginVersion = () => {
  const { fetchPluginVersion } = useContext(PaymentContext);
  const [newVersion, setNewVersion] = useState(false);
  const {
    pluginVersionLink,
    currentVersion,
    sourcePackageLink,
    pluginDownloadLink,
  } = useApplicationContext((context) => context.environment);

  useEffect(async () => {
    const version = await fetchPluginVersion();
    if (version === currentVersion) setNewVersion(true);
  }, [sourcePackageLink]);

  return (
    <div>
      <div className="plugin-version-wrapper">
        <Link
          className="external-link"
          isExternal={true}
          to={pluginVersionLink}
        >
          Plug-in Latest version update
        </Link>
      </div>
      {newVersion && (
        <div className="plugin-version-wrapper">
          <Link
            className="external-link"
            isExternal={true}
            to={pluginDownloadLink}
          >
            Latest Platform version is available for update
          </Link>
        </div>
      )}
    </div>
  );
};
export default PluginVersion;
