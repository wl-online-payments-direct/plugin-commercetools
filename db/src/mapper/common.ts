// eslint-disable-next-line @typescript-eslint/no-explicit-any
const retry = async (action: any, maxAttemptCount = 3) => {
  let retries = maxAttemptCount;
  while (retries > 0) {
    retries -= 1;
    // eslint-disable-next-line no-await-in-loop
    const { isRetry, data = {} } = await action();
    if (!isRetry) {
      return data;
    }
  }
  // If max retries attempted; throw error
  if (!retries) {
    throw {
      statusCode: 500,
      message: 'Failed to fetch the resource. Max retry attempt failed',
    };
  }

  return null;
};

export { retry };
