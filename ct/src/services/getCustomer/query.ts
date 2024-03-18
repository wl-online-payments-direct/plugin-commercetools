const query = `query ($where: String) {
  customers(where: $where ) {
    results {
      id
      firstName
      lastName
      email
    }
  }
}
  `;

export default query;
