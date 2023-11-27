const cors = () => ({
  'Access-Control-Allow-Origin': process.env.APP_CORS_ALLOWED_HOSTS,
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 900,
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Expose-Headers': 'Content-Encoding, Kuma-Revision',
  'Content-Type': 'application/json',
});

export { cors };
