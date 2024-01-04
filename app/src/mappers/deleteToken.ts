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
