// GraphQL query to get Custom objects
const query = `
    query($containerName: String!, $key: String!)  {
        customObject (container: $containerName, key:$key) {
            id
            key
            container
            value
        }
    }
`;

export default query;
