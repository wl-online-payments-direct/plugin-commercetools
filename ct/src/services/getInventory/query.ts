const query = `
query ($where: String!, $limit: Int) {
  inventoryEntries(where: $where, limit:$limit) {
    total
    count
    exists
    results {
      id
      version
      sku
      quantityOnStock
      availableQuantity
      key
      expectedDelivery
      supplyChannel{
        id
      }
    }
  }
}  
`;
export default query;
