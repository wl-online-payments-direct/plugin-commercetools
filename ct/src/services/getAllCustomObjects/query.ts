// GraphQL query to get all Custom objects
const query = `
query ($containerName: String!) {
    customObjects(container: $containerName) {
      count
      results {
        id
        key
        container
        value
      }
    }
  }
`;

export default query;
