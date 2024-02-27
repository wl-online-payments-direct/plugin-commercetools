export function getDeletedTokenMappedResponse(
  hasDBTokenDeleted: { [key: string]: string | Date | number },
  hasPspTokenDeleted: boolean,
) {
  const hasDeleted = !!hasDBTokenDeleted && hasPspTokenDeleted;

  return {
    hasDeleted,
    ...(!hasDeleted
      ? {
          details: {
            hasDbRecordsDeleted: !!hasDBTokenDeleted,
            hasPspRecordsDeleted: hasPspTokenDeleted,
          },
        }
      : {}),
  };
}
