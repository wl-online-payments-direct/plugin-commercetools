export const appendAdditionalParamsToUrl = (
  url: string,
  additionalParams: { [key: string]: string },
) => {
  const formattedUrl = new URL(url);
  Object.keys(additionalParams).forEach((key) => {
    if (additionalParams[key]) {
      formattedUrl.searchParams.append(key, additionalParams[key]);
    }
  });
  return formattedUrl?.href;
};
