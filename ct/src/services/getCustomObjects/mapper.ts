const mapper = (response: any) => {
  if (response?.body?.errors) {
    throw {
      message: "[CT] Failed to retrieve custom object information",
      details: response?.body?.errors,
      statusCode: 400,
    };
  }

  const parsedRes = response?.body?.data?.customObjects || {};
  const result = parsedRes.results.find(
    (e: { container: string }) => e.container === "wl-configuration"
  );
  const config = JSON.parse(JSON.stringify(result.value));
  return config;
};

export default mapper;
