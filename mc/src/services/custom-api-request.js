import {
  buildApiUrl,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';

export const fetcher = async (url, config = {}, flag) => {
  let headers;
  const data = await executeHttpClientRequest(
    async (options) => {
      headers = { ...options.headers, ...config.headers };
      const res = await fetch(buildApiUrl(url), {
        ...config,
        headers,
        credentials: 'include',
      });
      if (flag === 'download') {
        const url = window.URL.createObjectURL(
          new Blob([res], { type: 'application/zip' })
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'fileName.zip');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        const data = res.json();
        return {
          data,
          statusCode: res.status,
          getHeader: (key) => res.headers.get(key),
        };
      }
    },
    { headers }
  );
  return data;
};
