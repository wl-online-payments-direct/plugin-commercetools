import {
  buildApiUrl,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';

export const fetcher = async (url, config = {}) => {
  let headers;
  const data = await executeHttpClientRequest(
    async (options) => {
      headers = { ...options.headers, ...config.headers };
      const res = await fetch(buildApiUrl(url), {
        ...config,
        headers,
        credentials: 'include',
      });
      const data = res.json();
      return {
        data,
        statusCode: res.status,
        getHeader: (key) => res.headers.get(key),
      };
    },
    { headers }
  );
  return data;
};

export const downloadFetcher = async (url, config = {}) => {
  let headers;
  await executeHttpClientRequest(async (options) => {
    headers = { ...options.headers, ...config.headers };
    fetch(buildApiUrl(url), {
      ...config,
      headers,
      credentials: 'include',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        const fileName = `Worldline-log-${Date.now()}.zip`;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  });
};
