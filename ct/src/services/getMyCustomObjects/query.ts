// GraphQL query to get Custom objects
const query = `
    query($containerName: String!)  {
        customObjects (container: $containerName) {
            total
            results{
                id
                key
                container
                value
            }
        }
    }
`;

export default query;
