import { DeleteTokenPayload } from '../types';

export function getConditionByToken(payload: DeleteTokenPayload) {
  const { token = '' } = payload || {};
  return { token };
}

export function getDeletedTokenMappedResponse(
  hasDBTokenDeleted: {
    count: number;
  },
  hasPspTokenDeleted: boolean,
) {
  const hasDeleted = hasDBTokenDeleted?.count && hasPspTokenDeleted;

  return {
    hasDeleted,
    ...(!hasDeleted
      ? {
          details: {
            hasDbRecordsDeleted: hasDBTokenDeleted?.count,
            hasPspRecordsDeleted: hasPspTokenDeleted,
          },
        }
      : {}),
  };
}
