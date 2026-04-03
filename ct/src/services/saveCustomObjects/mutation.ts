// GraphQL mutation to create or update Custom Object
const mutation = `
mutation($draft: CustomObjectDraft!) {
  createOrUpdateCustomObject(draft: $draft) {
    id
    version
    key
    container
    value
  }
}
`;

export default mutation;
