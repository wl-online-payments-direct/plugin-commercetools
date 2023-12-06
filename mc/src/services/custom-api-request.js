import {
    buildApiUrl,
    executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';

export const fetcher = async (url, config = {}) => {
    let headers;
    const data = await executeHttpClientRequest(
        async (options) => {
            headers = { ...options.headers, ...config.headers };
            const res = await fetch(buildApiUrl(url), { ...config, headers });
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