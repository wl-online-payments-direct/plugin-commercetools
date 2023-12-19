const query = `
mutation(
    $id: String!, 
    $version: Long!, 
    $updateProductData: Boolean
  ) {
    updateCart(
      id:$id,
      version:$version,
      actions:[{
        recalculate : {
          updateProductData: $updateProductData
        }
      }]
    ){
      id
      version
    }
  }
  
`;
export default query;
