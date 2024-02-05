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

export const camelCase = (str: string) =>
  str
    ?.toLowerCase()
    ?.replace(
      /[^a-zA-Z0-9]+(.)/g,
      (_m: string, chr: string) => chr?.toUpperCase(),
    );
