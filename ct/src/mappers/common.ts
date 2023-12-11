import { ErrorObject } from '@commercetools/platform-sdk';

export const hasErrorDueConcurrentModification = (result: {
  body: { errors: ErrorObject[] };
}) => {
  const isErrorDueConcurrentModification = result?.body?.errors?.find(
    (e: ErrorObject) => e.extensions.code === 'ConcurrentModification',
  );
  return !!isErrorDueConcurrentModification;
};
