const query = `
query ($where: String!) {
  inventoryEntries(where: $where) {
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
